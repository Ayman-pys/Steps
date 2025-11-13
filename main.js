const startBtn = document.getElementById("start-btn");
const quizContainer = document.querySelector(".quiz-container");
let selectedCategory = null;
let selectedNum = 5;

// --- Select category ---
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
  });
});

// --- Select number of questions ---
document.querySelectorAll(".num-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".num-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedNum = parseInt(btn.dataset.num);
  });
});

// --- Question Bank ---
const questionBank = {
  Python: [
    { question: "What keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], answer: "def" },
    { question: "What is the output of: print(type([]))?", options: ["<class 'tuple'>", "<class 'dict'>", "<class 'list'>", "<class 'set'>"], answer: "<class 'list'>" },
    { question: "Which of the following is used to handle exceptions in Python?", options: ["try-except", "do-catch", "error-handling", "if-else"], answer: "try-except" },
    { question: "Which of these data types is immutable?", options: ["list", "set", "tuple", "dict"], answer: "tuple" },
    { question: "How do you start a comment in Python?", options: ["//", "#", "/*", "<!--"], answer: "#" },
    { question: "Which keyword is used to create a class in Python?", options: ["func", "object", "define", "class"], answer: "class" },
    { question: "What is the output of 3 * 'abc' in Python?", options: ["abcabcabc", "abc", "error", "3abc"], answer: "abcabcabc" },
    { question: "Which of these is not a Python data type?", options: ["List", "Array", "Tuple", "Set"], answer: "Array" },
    { question: "Which function converts a string to lowercase?", options: ["lower()", "downcase()", "toLower()", "case()"], answer: "lower()" },
    { question: "What is used to import a module in Python?", options: ["include", "require", "import", "using"], answer: "import" },
    { question: "Which operator is used for exponentiation?", options: ["^", "**", "exp", "//"], answer: "**" },
    { question: "Which function returns the length of a list?", options: ["length()", "size()", "len()", "count()"], answer: "len()" },
    { question: "Which keyword is used to exit a loop?", options: ["exit", "break", "stop", "end"], answer: "break" },
    { question: "Which symbol is used for floor division?", options: ["/", "//", "%", "**"], answer: "//" },
    { question: "Which method adds an item to the end of a list?", options: ["append()", "add()", "push()", "insert()"], answer: "append()" },
    { question: "Which of these is a Python tuple?", options: ["[1,2,3]", "{1,2,3}", "(1,2,3)", "None"], answer: "(1,2,3)" },
    { question: "Which of these is used to create a set?", options: ["{}", "[]", "()", "set()"], answer: "set()" },
    { question: "What is the result of True and False?", options: ["True", "False", "1", "0"], answer: "False" },
    { question: "Which keyword creates a generator?", options: ["yield", "generate", "return", "create"], answer: "yield" },
    { question: "How do you check equality in Python?", options: ["=", "==", "===", "!="], answer: "==" },
    { question: "Which of these converts a value to an integer?", options: ["int()", "str()", "float()", "convert()"], answer: "int()" },
    { question: "Which of these is mutable?", options: ["tuple", "list", "str", "int"], answer: "list" },
    { question: "Which function prints to console?", options: ["echo()", "console.log()", "print()", "write()"], answer: "print()" },
    { question: "Which method removes an item from a list?", options: ["pop()", "delete()", "removeItem()", "discard()"], answer: "pop()" },
    { question: "What is the boolean value of an empty list?", options: ["True", "False", "None", "0"], answer: "False" },
  ],
  
  Sql: [
    { question: "Which SQL statement is used to extract data from a database?", options: ["GET", "OPEN", "SELECT", "EXTRACT"], answer: "SELECT" },
    { question: "What command removes all records from a table?", options: ["REMOVE", "DELETE", "TRUNCATE", "DROP"], answer: "TRUNCATE" },
    { question: "Which SQL clause filters results?", options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"], answer: "WHERE" },
    { question: "Which function counts rows?", options: ["SUM()", "COUNT()", "ROWS()", "TOTAL()"], answer: "COUNT()" },
    { question: "What keyword sorts results?", options: ["SORT", "ORDER BY", "ARRANGE", "ALIGN"], answer: "ORDER BY" },
    { question: "Which statement modifies existing records?", options: ["CHANGE", "ALTER", "UPDATE", "MODIFY"], answer: "UPDATE" },
    { question: "Which clause groups rows?", options: ["GROUP BY", "ORDER BY", "WHERE", "JOIN"], answer: "GROUP BY" },
    { question: "Which operator combines two conditions?", options: ["AND", "BOTH", "EITHER", "PLUS"], answer: "AND" },
    { question: "Which clause filters groups?", options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"], answer: "HAVING" },
    { question: "Which statement deletes a table?", options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"], answer: "DROP" },
    { question: "Which statement inserts new rows?", options: ["INSERT INTO", "ADD ROW", "INSERT ROW", "UPDATE"], answer: "INSERT INTO" },
    { question: "Which SQL joins tables?", options: ["JOIN", "CONNECT", "MERGE", "LINK"], answer: "JOIN" },
    { question: "Which keyword avoids duplicate results?", options: ["DISTINCT", "UNIQUE", "EXCLUSIVE", "ONLY"], answer: "DISTINCT" },
    { question: "Which function returns the max value?", options: ["MAX()", "UPPER()", "HIGH()", "TOP()"], answer: "MAX()" },
    { question: "Which function returns the min value?", options: ["MIN()", "LOWER()", "BOTTOM()", "BOTTOMVALUE()"], answer: "MIN()" },
    { question: "Which operator is for pattern matching?", options: ["LIKE", "MATCH", "REGEXP", "PATTERN"], answer: "LIKE" },
    { question: "Which command removes a column?", options: ["DROP COLUMN", "DELETE COLUMN", "REMOVE COLUMN", "ALTER DROP"], answer: "DROP COLUMN" },
    { question: "Which statement renames a table?", options: ["RENAME", "ALTER TABLE", "UPDATE", "MODIFY"], answer: "ALTER TABLE" },
    { question: "Which operator checks inequality?", options: ["!=", "<>", "NOT EQUAL", "!=="], answer: "!=" },
    { question: "Which aggregate sums a column?", options: ["SUM()", "TOTAL()", "ADD()", "SUMMATION()"], answer: "SUM()" },
    { question: "Which SQL keyword limits results?", options: ["LIMIT", "TOP", "ROWS", "MAX"], answer: "LIMIT" },
    { question: "Which SQL keyword removes duplicates?", options: ["DISTINCT", "UNIQUE", "ONLY", "NONE"], answer: "DISTINCT" },
    { question: "Which SQL statement modifies table structure?", options: ["ALTER TABLE", "MODIFY TABLE", "CHANGE TABLE", "UPDATE TABLE"], answer: "ALTER TABLE" },
    { question: "Which SQL statement removes all rows but keeps table?", options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"], answer: "TRUNCATE" },
  ],
  
  "F-E-D": [
    { question: "Which HTML tag links an external CSS file?", options: ["<style>", "<script>", "<link>", "<css>"], answer: "<link>" },
    { question: "Which CSS property changes text color?", options: ["background-color", "color", "font-color", "text-style"], answer: "color" },
    { question: "What does DOM stand for?", options: ["Document Object Model", "Display Object Management", "Data Output Method", "Digital Ordinance Model"], answer: "Document Object Model" },
    { question: "Which method adds an element to the end of an array?", options: ["push()", "append()", "add()", "insert()"], answer: "push()" },
    { question: "Which CSS layout uses flexible boxes?", options: ["Flexbox", "Grid", "Table", "Inline-block"], answer: "Flexbox" },
    { question: "What tag defines a hyperlink?", options: ["<a>", "<href>", "<link>", "<url>"], answer: "<a>" },
    { question: "Which HTML element displays the largest heading?", options: ["<h6>", "<h1>", "<head>", "<header>"], answer: "<h1>" },
    { question: "Which CSS property controls font size?", options: ["font-size", "text-size", "size", "font-weight"], answer: "font-size" },
    { question: "Which CSS property sets background color?", options: ["background-color", "bg-color", "color", "background"], answer: "background-color" },
    { question: "Which HTML tag defines a paragraph?", options: ["<p>", "<para>", "<paragraph>", "<text>"], answer: "<p>" },
    { question: "Which method removes last element from array?", options: ["pop()", "remove()", "delete()", "shift()"], answer: "pop()" },
    { question: "Which CSS property sets font style?", options: ["font-style", "text-style", "style", "font"], answer: "font-style" },
    { question: "Which HTML tag is used for images?", options: ["<img>", "<image>", "<picture>", "<src>"], answer: "<img>" },
    { question: "Which CSS property sets margin?", options: ["margin", "padding", "spacing", "gap"], answer: "margin" },
    { question: "Which CSS property sets padding?", options: ["padding", "margin", "space", "gap"], answer: "padding" },
    { question: "Which HTML tag defines a list item?", options: ["<li>", "<ul>", "<list>", "<ol>"], answer: "<li>" },
    { question: "Which CSS property sets width?", options: ["width", "size", "length", "w"], answer: "width" },
    { question: "Which CSS property sets height?", options: ["height", "size", "length", "h"], answer: "height" },
    { question: "Which CSS property sets display mode?", options: ["display", "show", "view", "mode"], answer: "display" },
    { question: "Which HTML tag defines a button?", options: ["<button>", "<btn>", "<input>", "<click>"], answer: "<button>" },
    { question: "Which CSS property aligns text?", options: ["text-align", "align-text", "align", "font-align"], answer: "text-align" },
    { question: "Which HTML tag defines a form?", options: ["<form>", "<input>", "<fieldset>", "<label>"], answer: "<form>" },
    { question: "Which CSS property sets float?", options: ["float", "align", "position", "move"], answer: "float" },
    { question: "Which HTML tag defines a table?", options: ["<table>", "<tab>", "<tbl>", "<grid>"], answer: "<table>" },
    { question: "Which CSS property sets border?", options: ["border", "outline", "stroke", "frame"], answer: "border" },
  ],

  Basics: [
    { question: "Which number system does a computer use?", options: ["Decimal", "Octal", "Binary", "Hexadecimal"], answer: "Binary" },
    { question: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Central Processor Utility", "Control Processing Unit"], answer: "Central Processing Unit" },
    { question: "Which device is used for input?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], answer: "Keyboard" },
    { question: "What is 1 byte equal to?", options: ["4 bits", "8 bits", "16 bits", "1024 bits"], answer: "8 bits" },
    { question: "Which software is used to browse the internet?", options: ["Word Processor", "Compiler", "Browser", "Database"], answer: "Browser" },
    { question: "Which part of a computer performs calculations?", options: ["CPU", "Monitor", "Keyboard", "RAM"], answer: "CPU" },
    { question: "What does RAM stand for?", options: ["Random Access Memory", "Read Access Memory", "Rapid Action Memory", "Runtime Access Module"], answer: "Random Access Memory" },
    { question: "Which is an example of output device?", options: ["Keyboard", "Mouse", "Monitor", "Scanner"], answer: "Monitor" },
    { question: "Which memory is volatile?", options: ["ROM", "RAM", "Flash", "Cache"], answer: "RAM" },
    { question: "Which device stores data permanently?", options: ["HDD", "RAM", "GPU", "CPU"], answer: "HDD" },
    { question: "Which is the brain of the computer?", options: ["CPU", "RAM", "GPU", "Motherboard"], answer: "CPU" },
    { question: "Which device displays output?", options: ["Printer", "Monitor", "Keyboard", "Mouse"], answer: "Monitor" },
    { question: "Which storage is fastest?", options: ["HDD", "SSD", "RAM", "Optical Disk"], answer: "RAM" },
    { question: "Which device reads data from disks?", options: ["CD-ROM", "RAM", "GPU", "CPU"], answer: "CD-ROM" },
    { question: "Which type of memory is permanent?", options: ["ROM", "RAM", "Cache", "Registers"], answer: "ROM" },
    { question: "Which device accepts commands from user?", options: ["Keyboard", "Monitor", "Printer", "Speaker"], answer: "Keyboard" },
    { question: "Which unit measures memory size?", options: ["Byte", "Bit", "Pixel", "Hertz"], answer: "Byte" },
    { question: "Which device converts digital to analog?", options: ["DAC", "ADC", "CPU", "RAM"], answer: "DAC" },
    { question: "Which device converts analog to digital?", options: ["DAC", "ADC", "CPU", "RAM"], answer: "ADC" },
    { question: "Which component stores temporary data?", options: ["RAM", "ROM", "HDD", "GPU"], answer: "RAM" },
    { question: "Which device connects to network?", options: ["Router", "CPU", "Monitor", "Printer"], answer: "Router" },
    { question: "Which is non-volatile memory?", options: ["ROM", "RAM", "Cache", "Registers"], answer: "ROM" },
    { question: "Which is the primary storage?", options: ["RAM", "HDD", "SSD", "ROM"], answer: "RAM" },
    { question: "Which is secondary storage?", options: ["RAM", "HDD", "Registers", "CPU"], answer: "HDD" },
    { question: "Which part controls all operations?", options: ["CPU", "GPU", "RAM", "ROM"], answer: "CPU" },
  ],
};

// --- Quiz Variables ---
let questions = [];
let currentQ = 0;
let score = 0;

// --- Start Quiz ---
startBtn.addEventListener("click", () => {
  if (!selectedCategory) {
    alert("Select a category first!");
    return;
  }

  quizContainer.innerHTML = "";
  questions = questionBank[selectedCategory].sort(() => 0.5 - Math.random()).slice(0, selectedNum);
  currentQ = 0;
  score = 0;

  showQuestion();
});

// --- Show Question ---
function showQuestion() {
  quizContainer.innerHTML = `
    <div class="quiz-box">
      <header>
        <h2>Question ${currentQ + 1} of ${questions.length}</h2>
        <div class="timer" id="timer">15s</div>
      </header>
      <section>
        <h3>${questions[currentQ].question}</h3>
        <div class="option-list" id="options"></div>
      </section>
      <footer>
        <button class="next-btn" id="next-btn" disabled>Next</button>
      </footer>
    </div>
  `;

  const optionsDiv = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  let timeLeft = 15;
  const timerEl = document.getElementById("timer");

  const timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timer);
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
      nextBtn.disabled = false;
    }
  }, 1000);

  questions[currentQ].options.sort(() => 0.5 - Math.random()).forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option";
    btn.addEventListener("click", () => {
      clearInterval(timer);
      if (opt === questions[currentQ].answer) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("incorrect");
        // Highlight correct answer
        Array.from(optionsDiv.children).forEach(b => {
          if (b.textContent === questions[currentQ].answer) b.classList.add("correct");
        });
      }
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
      nextBtn.disabled = false;
    });
    optionsDiv.appendChild(btn);
  });

  nextBtn.addEventListener("click", () => {
    currentQ++;
    if (currentQ < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
}

// --- Show Result ---
function showResult() {
  quizContainer.innerHTML = `
    <div class="quiz-box">
      <header>
        <h2>Quiz Completed!</h2>
      </header>
      <section>
        <h3>Your Score: ${score} / ${questions.length}</h3>
      </section>
      <footer>
        <button class="next-btn" id="restart-btn">Restart Quiz</button>
      </footer>
    </div>
  `;

  document.getElementById("restart-btn").addEventListener("click", () => {
    location.reload();
  });
}
