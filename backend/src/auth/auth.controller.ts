// File: backend/src/auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Step 1: Redirect user to Google
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Passport will handle the redirect to Google
  }

  // Step 2: Google redirects back here
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: any, @Res() res: any) {
    // req.user comes from GoogleStrategy.validate()
    const { user, token } = await this.authService.validateOAuthLogin(req.user);

    // Redirect back to frontend with JWT (avoid exposing in query params in logs; consider setting cookie)
    const redirectUrl = new URL(process.env.OAUTH_SUCCESS_REDIRECT_URL!); // e.g. https://your.frontend.app/oauth/success
    redirectUrl.searchParams.set('token', token);

    return res.redirect(redirectUrl.toString());
  }
}
