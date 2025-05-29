import { JwtGuard } from '@/auth/guards/jwt.guard';
import { Body, Controller, Post, UseGuards, Get, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PaypalService } from './paypal.service';

@Controller('paypal')
@ApiTags('PayPal')
@ApiBearerAuth('jwt') // Áp dụng cho toàn bộ controller
export class PaypalController {
    constructor(private readonly paypalService: PaypalService) {}

    @UseGuards(JwtGuard)
    @Post('create-order')
    @ApiOperation({ summary: 'Tạo đơn hàng PayPal' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                amount: { type: 'string', example: '100' }
            }
        },
        required: true,
    })
    @ApiResponse({ status: 201, description: 'Tạo đơn hàng thành công' })
    async createOrder(@Body('amount') amount: string = '100', @Req() req: any) {
        return await this.paypalService.createOrder(amount, req.user);
    }

    @UseGuards(JwtGuard)
    @Get('get-order/:id')
    @ApiOperation({ summary: 'Lấy thông tin đơn hàng từ PayPal' })
    @ApiParam({ name: 'id', type: 'string', example: '39P47887LD4298546' })
    @ApiResponse({ status: 200, description: 'Lấy thông tin đơn hàng thành công' })
    async getOrder(@Param('id') id: string) {
        return await this.paypalService.getOrder(id);
    }

    @UseGuards(JwtGuard)
    @Get('capture-order/:id')
    @ApiOperation({ summary: 'Lấy thông tin đơn hàng từ PayPal' })
    @ApiParam({ name: 'id', type: 'string', example: '39P47887LD4298546' })
    @ApiResponse({ status: 200, description: 'Lấy thông tin đơn hàng thành công' })
    async captureOrder(@Param('id') id: string) {
        return await this.paypalService.captureOrder(id);
    }
}
