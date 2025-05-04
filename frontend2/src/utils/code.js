export default function generateRandomSnippet() {
  const snippets = {
    javascript: [
      `const add = (a, b) => a + b;`,
      `console.log("Hello, JavaScript!");`,
      `for (let i = 0; i < 5; i++) console.log(i);`,
    ],
    python: [
      `def greet(name):\n    print(f"Hello, {name}!")`,
      `for i in range(5):\n    print(i)`,
      `print("Hello, Python!")`,
    ],
    cpp: [
      `#include <iostream>\nint main() {\n  std::cout << "Hello, C++!";\n  return 0;\n}`,
      `for (int i = 0; i < 5; i++) std::cout << i << std::endl;`,
      `int add(int a, int b) { return a + b; }`,
    ]
  };

  const languages = Object.keys(snippets);
  const randomLang = languages[Math.floor(Math.random() * languages.length)];
  const codeList = snippets[randomLang];
  const randomCode = codeList[Math.floor(Math.random() * codeList.length)];

  return {
    language: randomLang,
    code: randomCode
  };
}

// Example usage:
// const snippet = generateRandomSnippet();
// console.log(`Language: ${snippet.language.toUpperCase()}\nCode:\n${snippet.code}`);
