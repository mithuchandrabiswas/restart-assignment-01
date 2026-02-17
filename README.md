# restart-assignment-01
## 1) What is the difference between null and undefined?

**undefined** হলো JavaScript-এর ডিফল্ট মান। কোনো ভেরিয়েবল declare করা হলেও যদি তাকে কোনো মান দেওয়া না হয়, তাহলে তার মান হয় undefined।

অন্যদিকে, **null** হলো একটি ইচ্ছাকৃত মান।

---

## 2) What is the use of the map() function in JavaScript? How is it different from forEach()?

`map()` ফাংশন একটি array-এর প্রতিটি element এর উপর কাজ করে এবং **একটি নতুন array রিটার্ন করে**।

অন্যদিকে, `forEach()` শুধুমাত্র loop চালায়, কিন্তু **কোনো নতুন array রিটার্ন করে না**।

---

## 3) What is the difference between == and ===?

"==" এটি value চেক করে, কিন্তু data type চেক করে না।

"===" এটি value এবং data type দুটোই চেক করে।

---

## 4) What is the significance of async/await in fetching API data?
* যেসব কাজ করতে একটু সময় লাগে সেসব কাজের ক্ষেত্রে async/await পদ্ধতি ব্যবহার করে ডাটা আনা বা কাজ করে থাকে। 
* async/await ব্যবহার করলে asynchronous code লেখা অনেক সহজ ও readable হয়।
* API থেকে data আনতে সময় লাগে। async/await ব্যবহার করলে:
- code synchronous এর মতো পড়ে
- callback বা `.then()` এর ঝামেলা কমে
- error handle করা সহজ হয়

---

## 5) Explain the concept of Scope in JavaScript (Global, Function, Block).

**Scope** মানে হলো কোনো ভেরিয়েবল কোথা থেকে access করা যাবে তা নির্ধারণ করা।

### Global Scope
যে ভেরিয়েবল function-এর বাইরে declare করা হয়, সেটি global scope এ থাকে এবং সব জায়গা থেকে access করা যায়।

### Function Scope
যে ভেরিয়েবল function-এর ভিতরে declare করা হয়, সেটি শুধু সেই function-এর ভিতরেই ব্যবহার করা যায়।

### Block Scope
যে ভেরিয়েবল শুধু একটি নির্দিষ্ট { } ব্লকের ভিতরেই কাজ করে অথার্ৎ ব্লকের বাইরে থেকে সেই ভেরিয়েবলকে access না যায় তাই Block Scope. JavaScript-এ সাধারণত let এবং const দিয়ে declare করা ভেরিয়েবলগুলো block scope।