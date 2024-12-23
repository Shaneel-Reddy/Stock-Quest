package com.stockquest.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stockName;
    private String ticker;
    private double quantity;
    private double buyPrice;
    private double currentPrice;
    private double gainPercent;
    private double value;
    
    @ManyToOne
    @JsonBackReference
    private Portfolio portfolio;

    @ManyToOne
    private Register user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(double buyPrice) {
        this.buyPrice = buyPrice;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public double getGainPercent() {
        return gainPercent;
    }

    public void setGainPercent(double gainPercent) {
        this.gainPercent = gainPercent;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public Register getUser() {
        return user;
    }

    public void setUser(Register user) { 
        this.user = user;
    }

    public Asset() {}

    public Asset(Long id, String stockName, String ticker, double quantity, double buyPrice, double currentPrice,
                 double gainPercent, double value, Portfolio portfolio, Register user) {
        this.id = id;
        this.stockName = stockName;
        this.ticker = ticker;
        this.quantity = quantity;
        this.buyPrice = buyPrice;
        this.currentPrice = currentPrice;
        this.gainPercent = gainPercent;
        this.value = value;
        this.portfolio = portfolio;
        this.user = user;
    }
    public Asset(String stockName, String ticker, int quantity, double buyPrice, double currentPrice,
            double gainPercent, Register user, Portfolio portfolio) {
	   this.stockName = stockName;
	   this.ticker = ticker;
	   this.quantity = quantity;
	   this.buyPrice = buyPrice;
	   this.currentPrice = currentPrice;
	   this.gainPercent = gainPercent;
	   this.user = user;
	   this.portfolio = portfolio;
    }

}
