
const API_URL = 'https://type.fit/api/quotes';
export class QuotesApi {
    static async getAllQuotes() {
        const response = await fetch(API_URL);
        const quotes = await response.json();
        return quotes
    }

    static async getRussianQuotes() {
      const russianQuotes = 'quotes.json';
      const result = await fetch(russianQuotes);
      const data = await result.json();
      return data
    }

    static async getBelarusianQuotes() {
      const belarusianQuotes = 'belarusian_quotes.json';
      const result = await fetch(belarusianQuotes);
      const data = await result.json();
      return data
    }
}