// export default {
//   content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
//   theme: { extend: {} },
//   plugins: [],
// };

// export default {
//   content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
//   theme: { extend: {} },
//   plugins: [],
// };


export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Detects all app files
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Detects all component files
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Ensures compatibility with older structures
    "./layout.js", // ✅ Ensures Tailwind sees this file
  ],
  theme: { extend: {} },
  plugins: [],
};
