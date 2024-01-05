package com.arpitha.fundo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.utility.DockerImageName;

@TestConfiguration(proxyBeanMethods = false)
public class TestFundoApplication {

//	@Bean
//	@ServiceConnection
//	MongoDBContainer mongoDbContainer() {
//		return new MongoDBContainer(DockerImageName.parse("mongo:latest"));
//	}

	public static void main(String[] args) {
		SpringApplication.from(FundoApplication::main).with(TestFundoApplication.class).run(args);
	}

}
