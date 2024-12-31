package com.stockquest.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;

import com.stockquest.entity.Asset;
import com.stockquest.entity.Portfolio;
import com.stockquest.entity.Register;
import com.stockquest.repo.AssetRepository;

@ExtendWith(SpringExtension.class)
class AssetServiceTest {

	@InjectMocks
	private AssetService assetService;

	@Mock
	private AssetRepository assetRepository;

	@Mock
	private RestTemplate restTemplate;

	@Value("${finnhub.api.url}")
	private String finnhubApiUrl;

	@Value("${finnhub.api.key}")
	private String finnhubApiKey;

	private Register user;
	private Portfolio portfolio;

	@BeforeEach
	void setUp() {
		user = new Register();
		user.setId(1L);
		user.setEmail("test@example.com");

		portfolio = new Portfolio(0.0, user, null);
		portfolio.setId(1L);
	}

	@Test
	void testCreateAsset() throws Exception {
		Register user = new Register();
		Portfolio portfolio = new Portfolio();
		Asset asset = new Asset("Apple Inc.", "AAPL", 1, 100.0, 120.0, 20.0, user, portfolio);

		when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(Map.of("c", 320.0));
		when(assetRepository.save(any(Asset.class))).thenReturn(asset);

		Asset createdAsset = assetService.createAsset(user, asset, portfolio);

		assertNotNull(createdAsset);
		assertEquals(320.0, createdAsset.getCurrentPrice());
	}

	@Test
	void testCreateDefaultAssetsForUser() {
		Register user = new Register();
		Portfolio portfolio = new Portfolio();

		List<Asset> assets = Arrays.asList(new Asset("Apple Inc.", "AAPL", 1, 100.0, 120.0, 20.0, user, portfolio),
				new Asset("Tesla Inc.", "TSLA", 1, 150.0, 140.0, -6.67, user, portfolio),
				new Asset("Microsoft Corporation", "MSFT", 1, 50.0, 55.0, 10.0, user, portfolio),
				new Asset("Amazon.com Inc.", "AMZN", 1, 200.0, 210.0, 5.0, user, portfolio),
				new Asset("Google", "GOOGL", 1, 30.0, 25.0, -16.67, user, portfolio));

		when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(Map.of("c", 320.0));
		when(assetRepository.saveAll(anyList())).thenReturn(assets);

		assetService.createDefaultAssetsForUser(user, portfolio);

		verify(assetRepository, times(1)).saveAll(anyList());
	}

	@Test
	void testUpdateAsset() throws Exception {
		Asset asset = new Asset("Apple Inc.", "AAPL", 1, 100.0, 120.0, 20.0, new Register(), new Portfolio());

		when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(Map.of("c", 320.0));
		when(assetRepository.findById(anyLong())).thenReturn(Optional.of(asset));
		when(assetRepository.save(any(Asset.class))).thenReturn(asset);

		Asset updatedAsset = new Asset("Apple Inc.", "AAPL", 2, 110.0, 130.0, 15.0, new Register(), new Portfolio());
		Asset result = assetService.updateAsset(1L, updatedAsset);

		assertNotNull(result);
		assertEquals(320.0, result.getCurrentPrice());
	}

	@Test
	void testDeleteAsset() {
		doNothing().when(assetRepository).deleteById(1L);

		assetService.deleteAsset(1L);

		verify(assetRepository, times(1)).deleteById(1L);
	}

	@Test
	void testGetAssetById() {
		Asset asset = new Asset("Apple Inc.", "AAPL", 1, 100.0, 120.0, 20.0, user, portfolio);
		asset.setId(1L);

		when(assetRepository.findById(1L)).thenReturn(Optional.of(asset));

		Asset result = assetService.getAssetById(1L);

		assertNotNull(result);
		assertEquals(asset, result);
	}

	@Test
	void testFetchCurrentPrice() {
		when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(Map.of("c", 120.0));

		Double result = assetService.fetchCurrentPrice("AAPL");

		assertEquals(120.0, result);
	}

	@Test
	void testUpdateStockPrices() {
		Asset apple = new Asset("Apple Inc.", "AAPL", 1, 100.0, 120.0, 20.0, user, portfolio);
		Asset amazon = new Asset("Amazon.com Inc.", "AMZN", 1, 200.0, 210.0, 5.0, user, portfolio);

		List<Asset> assets = Arrays.asList(apple, amazon);

		when(assetRepository.findAll()).thenReturn(assets);
		when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(Map.of("c", 130.0));

		assetService.updateStockPrices();

		assertEquals(130.0, apple.getCurrentPrice());
		assertEquals(130.0 * 1.0, apple.getValue());
		assertEquals(130.0, amazon.getCurrentPrice());
		assertEquals(130.0 * 1.0, amazon.getValue());
		verify(assetRepository, times(2)).save(any(Asset.class));
	}
}
