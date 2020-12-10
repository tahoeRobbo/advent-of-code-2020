/*
--- Day 1: Report Repair ---

After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.

The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.

To save your vacation, you need to get all fifty stars by December 25th.

  Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

  Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

  For example, suppose your expense report contained the following:

  1721
979
366
299
675
1456

In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?
*/

const expenseReport = '1140\n' +
  '1736\n' +
  '1711\n' +
  '1803\n' +
  '1825\n' +
  '1268\n' +
  '1651\n' +
  '2007\n' +
  '1923\n' +
  '1661\n' +
  '1788\n' +
  '1876\n' +
  '2003\n' +
  '1752\n' +
  '1988\n' +
  '1955\n' +
  '1568\n' +
  '1478\n' +
  '1699\n' +
  '1717\n' +
  '1828\n' +
  '1636\n' +
  '1387\n' +
  '1870\n' +
  '1658\n' +
  '1572\n' +
  '1703\n' +
  '1185\n' +
  '1569\n' +
  '1515\n' +
  '1142\n' +
  '1407\n' +
  '1587\n' +
  '1608\n' +
  '1827\n' +
  '1546\n' +
  '1808\n' +
  '1937\n' +
  '1815\n' +
  '1957\n' +
  '1401\n' +
  '1763\n' +
  '1970\n' +
  '1960\n' +
  '1853\n' +
  '1987\n' +
  '1865\n' +
  '1567\n' +
  '1664\n' +
  '1961\n' +
  '1771\n' +
  '1846\n' +
  '1971\n' +
  '1416\n' +
  '1897\n' +
  '633\n' +
  '1708\n' +
  '1606\n' +
  '515\n' +
  '1397\n' +
  '1873\n' +
  '1374\n' +
  '1969\n' +
  '1918\n' +
  '1170\n' +
  '1660\n' +
  '1494\n' +
  '1764\n' +
  '2002\n' +
  '1938\n' +
  '1396\n' +
  '1926\n' +
  '1714\n' +
  '1659\n' +
  '1805\n' +
  '1593\n' +
  '1899\n' +
  '1850\n' +
  '1644\n' +
  '1877\n' +
  '1561\n' +
  '1895\n' +
  '1985\n' +
  '1353\n' +
  '395\n' +
  '1919\n' +
  '1522\n' +
  '1745\n' +
  '1721\n' +
  '901\n' +
  '1765\n' +
  '1939\n' +
  '2009\n' +
  '1949\n' +
  '1852\n' +
  '1792\n' +
  '1749\n' +
  '1675\n' +
  '1883\n' +
  '1240\n' +
  '1868\n' +
  '1615\n' +
  '1693\n' +
  '1720\n' +
  '1388\n' +
  '1325\n' +
  '1337\n' +
  '867\n' +
  '1751\n' +
  '1408\n' +
  '1715\n' +
  '1942\n' +
  '1706\n' +
  '1894\n' +
  '1260\n' +
  '1945\n' +
  '1700\n' +
  '1148\n' +
  '1373\n' +
  '351\n' +
  '1790\n' +
  '1861\n' +
  '1755\n' +
  '1155\n' +
  '1622\n' +
  '1743\n' +
  '1872\n' +
  '1979\n' +
  '1262\n' +
  '1789\n' +
  '1305\n' +
  '1311\n' +
  '1729\n' +
  '1929\n' +
  '823\n' +
  '1623\n' +
  '2005\n' +
  '1932\n' +
  '1814\n' +
  '1909\n' +
  '1728\n' +
  '1592\n' +
  '1712\n' +
  '1363\n' +
  '1338\n' +
  '1804\n' +
  '1402\n' +
  '1198\n' +
  '264\n' +
  '1117\n' +
  '1791\n' +
  '1419\n' +
  '1229\n' +
  '1924\n' +
  '1838\n' +
  '1785\n' +
  '1982\n' +
  '1683\n' +
  '1950\n' +
  '1199\n' +
  '1984\n' +
  '1830\n' +
  '1921\n' +
  '1980\n' +
  '1834\n' +
  '1341\n' +
  '1282\n' +
  '1989\n' +
  '1854\n' +
  '1395\n' +
  '1847\n' +
  '1900\n' +
  '1913\n' +
  '1777\n' +
  '1779\n' +
  '1333\n' +
  '1800\n' +
  '1966\n' +
  '1543\n' +
  '1882\n' +
  '1375\n' +
  '1811\n' +
  '1673\n' +
  '1679\n' +
  '889\n' +
  '1670\n' +
  '1879\n' +
  '1312\n' +
  '1741\n' +
  '1772\n' +
  '1663\n' +
  '1776\n' +
  '1642\n' +
  '1674\n' +
  '1472\n' +
  '1580\n' +
  '1264\n' +
  '1738\n' +
  '1999\n' +
  '1637\n';
const expenseReportList = expenseReport
  .split('\n')
  .map((item) => parseInt(item, 10))
  .filter(item => item > 0)
  .sort((a, b) => a - b);

/*
loopCount 830
brute: 1.211ms
answer: 877971
*/
function solveBrute (expenseReportList) {
  const BRUTE = 'brute'
  console.time(BRUTE)
  let loopCount = 0;
  for (let i = 0, leni = expenseReportList.length; i < leni; i++){
    for (let j = 1, lenj = expenseReportList.length - 1; j < lenj; j++) {
      loopCount++;
      if (expenseReportList[i] + expenseReportList[j] === 2020) {
        console.log('loopCount', loopCount)
         console.timeLog(BRUTE)
        return expenseReportList[i] * expenseReportList[j];
      }
    }
  }
}


/*
loopCount 312
optimized: 0.505ms
answer: 877971
*/
const solveOpt = (expenseReportList) => {
  const OPT = 'optimized';
  console.time(OPT);
  let loopCount = 0;
  const bottomHalf = expenseReportList.filter((item) => item <= 1010);
  console.log('bottomHalf', bottomHalf)
  const topHalf = expenseReportList.filter((item) => item > 1010);

  loop1:
  for (let i = 0, len = bottomHalf.length; i < len; i++) {
    loopCount++;

    loop2:
    for (let j = 1, len = topHalf.length; j < len; j++) {
      loopCount++;

      if (bottomHalf[i] + topHalf[j] > 2020) {
        continue loop1;
      }
      if (parseInt(bottomHalf[i], 10) + parseInt(topHalf[j], 10) === 2020) {
        console.log('loopCount', loopCount)
        console.timeEnd(OPT);
        return bottomHalf[i] * topHalf[j];
      }
    }
  }
}


/****** Part 2 ******/
/*
The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?
*/

/*
loopCount 126
three: 3.503ms
answer: 203481432
*/
const solveForThree = (expenseReportList) => {
  let loopCount = 0
  const THREE = 'three'
  console.time(THREE)
  loop1:
  for (let i = 0, len = expenseReportList.length; i < len; i++) {
    loopCount++;

    loop2:
    for (let j = 1; j < len; j++) {
      loopCount++;

      loop3:
      if (expenseReportList[i] + expenseReportList[j] > 2020) {
          continue loop1;
        }
      for ( let k = 2; k < len; k++) {
        loopCount++;
        if (expenseReportList[i] + expenseReportList[j] + expenseReportList[k] > 2020) {
          continue loop2;
        }
        if (expenseReportList[i] + expenseReportList[j] + expenseReportList[k] === 2020) {
          console.log('loopCount', loopCount)
          console.timeLog(THREE);
          return expenseReportList[i] * expenseReportList[j] * expenseReportList[k];
        }
      }
    }
  }
};


let answer = solveBrute(expenseReportList);
// let answer = solveOpt(expenseReportList);
// let answer = solveForThree(expenseReportList);

console.log('answer:', answer)

exports = {}
