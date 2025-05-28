import { Injectable } from '@nestjs/common';
import { Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { OnModuleInit } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

// @Update()
// @Injectable()
// export class AppService {
//   // getData(): { message: string } {
//   //   return { message: 'Welcome to server!' };
//   // }

//   // @Start()
//   // async startCommand(ctx: Context) {
//   //   const userChatId = ctx.chat.id;
//   //   console.log("user chat id: ", userChatId);
//   //   await ctx.reply(`Welcome ${userChatId}`);
//   // }

//   // @Help()
//   // async helpCommand(ctx: Context) {
//   //   await ctx.reply('Send me a sticker');
//   // }

//   // @On('sticker')
//   // async onSticker(ctx: Context) {
//   //   await ctx.reply('👍');
//   // }

//   // @Hears('hi')
//   // async hearsHi(ctx: Context) {
//   //   await ctx.reply('Hey there');
//   // }
// }

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    await this.cacheManager.set('test_key', 'test_value');
    const val = await this.cacheManager.get('test_key');
    console.log(val);
  }
}
