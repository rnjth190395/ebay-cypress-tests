
describe('CoinGecko Bitcoin API Validation', () => {
  const endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin';

  it('should validate Bitcoin API data integrity', () => {
    cy.request(endpoint).then((response) => {
      expect(response.status).to.eq(200);
      const data = response.body;

      // Validate homepage URL
      expect(data.links.homepage[0]).to.not.be.empty;

      // Validate presence of currencies
      const bpi = data.market_data.current_price;
      expect(bpi).to.have.property('usd');
      expect(bpi).to.have.property('gbp');
      expect(bpi).to.have.property('eur');

      // Validate market cap and volume
      expect(data.market_data).to.have.property('market_cap');
      expect(data.market_data).to.have.property('total_volume');

      // Validate price change %
      expect(data.market_data).to.have.property('price_change_percentage_24h');
      expect(data.market_data.price_change_percentage_24h).to.be.a('number');
    });
  });
});
