import puppeteer from 'puppeteer';
import readlineSync from 'readline-sync';

const browser = await puppeteer.launch();

try {
  const page = await browser.newPage();
  
  const baseCurrency = readlineSync.question('Moeda base: ') || 'dolar'; 
  const finalCurrency = readlineSync.question('Moeda final: ') || 'real';
  
  await page.goto(
    `https://www.google.com/search?q=${baseCurrency}+para+${finalCurrency}&oq=dolar+para+real`
  );
  
  const result = await page.evaluate(
    () => document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value
  );
  
  console.log(`\nO valor de 1 ${baseCurrency} em ${finalCurrency} é de ${result}`);
} catch {
  console.log(
    '\nResultado não encontrado, verifique se o nome das moedas estão corretos!'
  )
} finally {
  await browser.close();
}



