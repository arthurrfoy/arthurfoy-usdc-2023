/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    const results = []
    for(let book of scannedTextObj) {
      if(book['Content']) {
        for(let bookContent of book['Content']) {
          // JS built in string search function that returns -1 if the search term is not found
          if(bookContent['Text'].search(searchTerm) != -1) {
            const obj = {
              'ISBN': book['ISBN'],
              'Page': bookContent['Page'],
              'Line': bookContent['Line'],
            }
            results.push(obj);
          }
        }
      }
    }

    var result = {
        "SearchTerm": searchTerm,
        "Results": results,
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const testIn = [
  {
      "Title": "Test one 1",
      "ISBN": "51397",
      "Content": [
          {
              "Page": 33,
              "Line": 7,
              "Text": "now simply went on by her own momentum.  The dark-"
          },
          {
              "Page": 5,
              "Line": 8,
              "Text": "ness was then profound; and however good the Canadian\'s"
          },
          {
              "Page": 21,
              "Line": 10,
              "Text": "eyes were, I asked myself how he had HeRE to see, and"
          } 
      ] 
  },
  {
    "Title": "Test one 2",
    "ISBN": "789",
    "Content": [
        {
            "Page": 29,
            "Line": 8,
            "Text": "now simply went on by her own HERE.  The dark-"
        },
        {
            "Page": 310,
            "Line": 9,
            "Text": "ness was then profound; and however good the Canadian\'s"
        },
        {
            "Page": 31,
            "Line": 80,
            "Text": "eyes were, I asked myself how he had HERE see, and"
        } 
    ] 
  }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const positiveTestOut = {
  "SearchTerm": "HERE",
  "Results": [
      {
          "ISBN": "789",
          "Page": 29,
          "Line": 8,
      },
      {
          "ISBN": "789",
          "Page": 31,
          "Line": 80
      }
  ]
}

const negativeTestOut = {
  "SearchTerm": "find",
  "Results": []
}

const caseSensitiveTestOut = {
  "SearchTerm": "HeRE",
  "Results": [
      {
          "ISBN": "51397",
          "Page": 21,
        "Line": 10,
      },
  ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


const positiveTest = findSearchTermInBooks("HERE", testIn);
if (JSON.stringify(positiveTest) === JSON.stringify(positiveTestOut) &&
    positiveTest.Results.length == 2) {
    console.log("PASS: Positive Test");
} else {
    console.log("FAIL: Positive Test");
    console.log("Expected:", positiveTestOut);
    console.log("Received:", positiveTest);
}

const negativeTest = findSearchTermInBooks("find", testIn);
if (JSON.stringify(negativeTest) === JSON.stringify(negativeTestOut) &&
    negativeTest.Results.length == 0) {
    console.log("PASS: Negative Test");
} else {
    console.log("FAIL: Negative Test");
    console.log("Expected:", negativeTestOut);
    console.log("Received:", negativeTest);
}

const caseSensitiveTest = findSearchTermInBooks("HeRE", testIn);
if (JSON.stringify(caseSensitiveTest) === JSON.stringify(caseSensitiveTestOut) &&
    caseSensitiveTest.Results.length == 1) {
    console.log("PASS: Case Sensitive Test");
} else {
    console.log("FAIL: Case Sensitive Test");
    console.log("Expected:", caseSensitiveTestOut);
    console.log("Received:", caseSensitiveTest);
}
