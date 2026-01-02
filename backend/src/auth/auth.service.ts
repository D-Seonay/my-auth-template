// File: backend/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

type OAuthProfile = {
  provider: string;
  providerAccountId: string;
  email?: string;
  name?: string;
  image?: string;
  tokens?: {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    idToken?: string;
    tokenType?: string;
    scope?: string;
  };
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  // Upsert user+account based on OAuth profile
  async validateOAuthLogin(profile: OAuthProfile) {
    // Try to find Account
    const existingAccount = await this.prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: profile.provider,
          providerAccountId: profile.providerAccountId,
        },
      },
      include: { user: true },
    });

    let user = existingAccount?.user;

    if (!user && profile.email) {
      // Try to link by email if user exists (merge accounts)
      user = await this.prisma.user.findUnique({ where: { email: profile.email } });
    }

    if (!user) {
      // Create new user
      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name,
          image: profile.image,
        },
      });
    } else {
      // Optionally update name/image with fresher data
      const shouldUpdate = (profile.name && profile.name !== user.name) || (profile.image && profile.image !== user.image);
      if (shouldUpdate) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { name: profile.name ?? user.name, image: profile.image ?? user.image },
        });
      }
    }

    // Upsert account link
    await this.prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: profile.provider,
          providerAccountId: profile.providerAccountId,
        },
      },
      update: {
        accessToken: profile.tokens?.accessToken,
        refreshToken: profile.tokens?.refreshToken,
        expiresAt: profile.tokens?.expiresAt,
        idToken: profile.tokens?.idToken,
        tokenType: profile.tokens?.tokenType,
        scope: profile.tokens?.scope,
        type: 'oauth',
        userId: user.id,
      },
      create: {
        provider: profile.provider,
        providerAccountId: profile.providerAccountId,
        accessToken: profile.tokens?.accessToken,
        refreshToken: profile.tokens?.refreshToken,
        expiresAt: profile.tokens?.expiresAt,
        idToken: profile.tokens?.idToken,
        tokenType: profile.tokens?.tokenType,
        scope: profile.tokens?.scope,
        type: 'oauth',
        userId: user.id,
      },
    });

    // Sign app JWT
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwt.signAsync(payload);

    return { user, token };
  }
}
