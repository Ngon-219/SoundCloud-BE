    import { TransactionRepo } from '@/repositories/transaction.repository';
import { User } from '@/user/entities/user.entity';
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
    import { Client, Environment, LogLevel, OrdersController, ApiError, CheckoutPaymentIntent } from '@paypal/paypal-server-sdk';

    @Injectable()
    export class PaypalService {
        private readonly client: Client;

        constructor(
            private readonly transactionRepo: TransactionRepo
        ) {
            this.client = new Client({
                clientCredentialsAuthCredentials: {
                    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
                    oAuthClientSecret: process.env.PAYPAL_SECRET_KET
                },
                timeout: 0,
                environment: Environment.Sandbox,
                logging: {
                    logLevel: LogLevel.Info,
                    logRequest: {
                    logBody: true
                    },
                    logResponse: {
                    logHeaders: true
                    }
                },
            });
        }

        async createOrder(amount: string, user: User) {
            const ordersController = new OrdersController(this.client);
            const collect = {
                body: {
                    intent: CheckoutPaymentIntent.Capture,
                    purchaseUnits: [
                    {
                        amount: {
                        currencyCode: 'USD',
                        value: amount,
                        },
                    }
                    ],
                },
                // prefer: 'return=minimal',
                application_context: {
                    "return_url": "myapp://payment-success",
                    "cancel_url": "myapp://payment-cancel"
                }
            }

            try {
                const { result, ...httpResponse } = await ordersController.createOrder(collect);
                console.log("result: ", result, " httpResponse: ", httpResponse)
                const transactionDetail = await this.transactionRepo.create({
                    user: user,
                    currency: 'USD',
                    status: result.status,
                    orderId: result.id,
                    amount: parseInt(amount),
                })
                await this.transactionRepo.save(transactionDetail);
                return {
                    message: "Tạo orders thành công",
                    result: result,
                    // httpResponse,
                    // collect: collect
                }
                // const { statusCode, headers } = httpResponse;
            } catch (error) {
                if (error instanceof ApiError) {
                    const errors = error.result;
                    console.error("error paypal: ", error)
                    throw new BadGatewayException("err when try to process payment with paypal");
                }
                console.error("error paypal: ", error)
                throw new BadGatewayException("err when try to process payment with paypal");
            }
        }

        async getOrder(collect_id: string) {
            const ordersController = new OrdersController(this.client);

            const collect = {
                id: collect_id   
            }

            try {
            const { result, ...httpResponse } = await ordersController.getOrder(collect);
            return {
                result
            }
            // Get more response info...
            // const { statusCode, headers } = httpResponse;
            } catch (error) {
                if (error instanceof ApiError) {
                    const errors = error.result;
                    console.log("error when get order: ", error);
                    // const { statusCode, headers } = error;
                }
                console.log("error when get order: ", error);
                throw new BadRequestException("Error when get orders paypal: ", error)
            }
        }

        async captureOrder(order_id: string) {
            const ordersController = new OrdersController(this.client);

            const collect = {
                id: order_id,
                prefer: 'return=minimal'
            }

            try {
                const { result, ...httpResponse } = await ordersController.captureOrder(collect);
                const existingTransaction = await this.transactionRepo.findOne({orderId: order_id})
                existingTransaction.status = result.status;
                await this.transactionRepo.save(existingTransaction);
                return result;
            // Get more response info...
            // const { statusCode, headers } = httpResponse;
            } catch (error) {
                if (error instanceof ApiError) {
                    const errors = error.result;
                    console.log(error);
                    // const { statusCode, headers } = error;
                }
                return {
                    
                }
            }
        }
    }
