import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'employee', url: 'http://localhost:3001/graphql' },
            { name: 'accounts', url: 'http://localhost:3002/graphql' },
            { name: 'customer', url: 'http://localhost:3003/graphql' },
            { name: 'pending-documents', url: 'http://localhost:3004/graphql' },
            { name: 'offers', url: 'http://localhost:3005/graphql' },
          ],
        }),
      },
      server: {
        playground: true,
        cors: true,
        // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
