# ClearCut — AI Background Removal

**ClearCut** is a premium, 100% client-side background removal tool. Powered by AI and optimized for speed and privacy, it allows users to remove image backgrounds directly in the browser without ever uploading data to a server.

**ClearCut** គឺជាឧបករណ៍លុបផ្ទៃខាងក្រោយ AI កម្រិតខ្ពស់ដែលដំណើរការ ១០០% នៅក្នុងកម្មវិធីរុករករបស់អ្នក។ វាត្រូវបានរចនាឡើងដើម្បីផ្ដល់នូវភាពរហ័ស និងឯកជនភាពខ្ពស់បំផុត ដោយមិនមានការបង្ហោះរូបភាពរបស់អ្នកទៅកាន់ម៉ាស៊ីនបម្រើឡើយ។

## ✨ Features | លក្ខណៈពិសេស

- **100% Private**: All AI processing happens locally on your device. (ឯកជនភាព ១០០%៖ រាល់ដំណើរការ AI ទាំងអស់ធ្វើឡើងនៅលើឧបករណ៍របស់អ្នកផ្ទាល់)
- **High-End UI**: Responsive, glassmorphism-inspired design reflecting modern aesthetics. (រចនាបថទំនើប៖ ស្រស់ស្អាត និងងាយស្រួលប្រើលើគ្រប់ឧបករណ៍)
- **Clipboard Paste Support**: Quickly paste images directly from your clipboard with `Ctrl+V`. (គាំទ្រការបិទភ្ជាប់៖ បិទភ្ជាប់រូបភាពភ្លាមៗដោយប្រើ `Ctrl+V`)
- **Sample Gallery**: Try the AI instantly with pre-provided high-quality samples. (រូបភាពគំរូ៖ សាកល្បង AI ភ្លាមៗជាមួយរូបភាពគំរូដែលផ្តល់ជូន)
- **Khmer Support**: Fully localized in Khmer with the beautiful Kantumruy Pro font. (គាំទ្រភាសាខ្មែរ៖ បានបកប្រែពេញលេញ និងប្រើប្រាស់ពុម្ពអក្សរ កន្ទុយហ្ម Pro)
- **Instant Downloads**: Save your results as high-quality PNGs with automatic timestamps. (ទាញយកភ្លាមៗ៖ រក្សាទុកលទ្ធផលជា PNG ដែលមានគុណភាពខ្ពស់)

## 🚀 Tech Stack | បច្ចេកវិទ្យា

- **React + Vite**: For blazing-fast development and performance.
- **@imgly/background-removal**: The core AI engine for background stripping.
- **Framer Motion**: Smooth animations and fluid transitions.
- **Lucide React**: Clean and sharp iconography.
- **Kantumruy Pro & Outfit**: Professional typography for Khmer and English.

## 🛠️ Getting Started | របៀបដំឡើង

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Lachsokhour/clearcut.git
   cd clearcut
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🌍 Deployment | ការដាក់ឱ្យដំណើរការ

When deploying to platforms like **Vercel** or **GitHub Pages**, ensure that the `public/background-removal/` folder is included in your git repository. This folder contains the necessary WASM and AI model files (~100MB) required for local processing.

> [!IMPORTANT]
> Make sure your `.gitignore` does not exclude the `public/background-removal/` directory if you want it to work on production.

## 🔒 Security & Privacy | សន្តិសុខ និងឯកជនភាព

This application leverages **ONNX Runtime Web** to run machine learning models directly in your browser's WASM environment. Your images are converted to blobs locally, processed by the AI, and the result is generated as a local URL. No tracking, no storage, no server-side logic.

កម្មវិធីនេះប្រើប្រាស់ **ONNX Runtime Web** ដើម្បីដំណើរការ AI នៅខាងក្នុងកម្មវិធីរុករករបស់អ្នក។ រូបភាពរបស់អ្នកមិនត្រូវបានចាកចេញពីឧបករណ៍របស់អ្នកឡើយ។ គ្មានការតាមដាន គ្មានការរក្សាទុក។

---
© 2026 ClearCut. Designed with ❤️ for privacy.
