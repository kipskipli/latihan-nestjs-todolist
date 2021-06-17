import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { UnauthorizedException } from 'src/common/server/response/http-exception/unauthorized.exception';
import { AppConfigService } from 'src/config/app/config.service';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor(
        private readonly appConfigService: AppConfigService
    ) {
        super({ header: 'inspigoKey', prefix: '' },
        true,
        async (apiKey, done) => {
            return this.validate(apiKey, done);
        });
    }

    public validate = (apiKey: string, done: (error: Error, data) => {}) => {
        if (this.appConfigService.key === apiKey) {
            done(null, true);
            return;
        }
        done(new UnauthorizedException(), null);
    }
}