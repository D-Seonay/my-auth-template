// File: backend/src/auth/strategies/google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!, // e.g. https://your.app/api/auth/google/callback
      scope: ['email', 'profile'],
      passReqToCallback: false,
      // state: true // enable if you handle CSRF state yourself
    });
  }

  // This returns minimal profile; tokens are provided in validate args
  validate(accessToken: string, refreshToken: string, profile: Profile, done: Function) {
    const emails = profile.emails || [];
    const email = emails[0]?.value;

    const normalized = {
      provider: 'google',
      providerAccountId: profile.id,
      email,
      name: profile.displayName,
      image: profile.photos?.[0]?.value,
      tokens: {
        accessToken,
        refreshToken,
        // expiresAt not directly provided by passport-google-oauth20
      },
    };

    done(null, normalized);
  }
}
