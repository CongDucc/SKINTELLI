# SKINTELLI - Ứng Dụng Chăm Sóc Da

Ứng dụng chăm sóc da thông minh được xây dựng bằng React Native Expo với TypeScript, giúp người dùng quản lý quy trình skincare, theo dõi tình trạng da và khám phá các sản phẩm phù hợp.

## 📱 Tính Năng

- **Onboarding & Authentication**: Giới thiệu ứng dụng, đăng nhập và đăng ký
- **Skin Quiz**: Bài test phân tích loại da với 5 câu hỏi
- **Dashboard**: Trang chủ với tổng quan về tình trạng da
- **Routine Management**: Quản lý quy trình chăm sóc da buổi sáng và tối
- **Journal**: Nhật ký theo dõi da với khả năng upload ảnh (tối đa 7 ảnh)
- **Product Catalog**: Danh mục sản phẩm với bộ lọc theo danh mục
- **Community**: Cộng đồng chia sẻ kinh nghiệm chăm sóc da
- **Profile**: Quản lý thông tin cá nhân và cài đặt

## 🛠 Công Nghệ Sử Dụng

- **React Native** với Expo SDK 54.0.0
- **TypeScript** - Type safety
- **React Context API** - State management
- **Expo Image Picker** - Upload ảnh từ thư viện
- **React Native Safe Area Context** - UI responsive
- **Expo Vector Icons** - Icon library

## 📋 Yêu Cầu Hệ Thống

- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn
- Expo CLI
- Expo Go app (trên điện thoại) hoặc Android Studio/Xcode (cho emulator)

## 🚀 Hướng Dẫn Cài Đặt

### 1. Clone Repository

```bash
git clone https://github.com/CongDucc/SKINTELLI.git
cd SKINTELLI
```

### 2. Cài Đặt Dependencies

```bash
npm install
```

hoặc nếu dùng yarn:

```bash
yarn install
```

### 3. Chạy Ứng Dụng

```bash
npm start
```

hoặc:

```bash
npx expo start
```

### 4. Chạy Trên Thiết Bị

#### Trên điện thoại thật:
1. Cài đặt **Expo Go** app từ App Store (iOS) hoặc Google Play (Android)
2. Quét QR code xuất hiện trong terminal hoặc trình duyệt
3. Ứng dụng sẽ tự động load

#### Trên Android Emulator:
```bash
npm run android
```

#### Trên iOS Simulator (chỉ macOS):
```bash
npm run ios
```

## 📂 Cấu Trúc Project

```
SKINTELLI/
├── App.tsx                          # Entry point, routing
├── assets/
│   └── products/                    # Product images (10 ảnh)
├── src/
│   ├── context/
│   │   └── RoutineContext.tsx       # State management cho routine
│   └── screens/
│       ├── OnboardingScreen.tsx     # Màn hình giới thiệu
│       ├── LoginScreen.tsx          # Đăng nhập
│       ├── RegisterScreen.tsx       # Đăng ký
│       ├── SkinQuizScreen.tsx       # Quiz phân tích da
│       ├── SkinAnalysisResultScreen.tsx  # Kết quả quiz
│       ├── DashboardScreen.tsx      # Trang chủ
│       ├── RoutineScreen.tsx        # Quy trình chăm sóc
│       ├── JournalScreen.tsx        # Nhật ký
│       ├── StoreScreen.tsx          # Danh mục sản phẩm
│       ├── CommunityScreen.tsx      # Cộng đồng
│       └── ProfileScreen.tsx        # Hồ sơ cá nhân
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Hướng Dẫn Sử Dụng

### Đăng Nhập Demo
- **Email**: `test@skincare.com`
- **Password**: `password123`

### Luồng Ứng Dụng
1. **Onboarding** → Giới thiệu 3 slides
2. **Login** → Đăng nhập hoặc đăng ký
3. **Skin Quiz** → Trả lời 5 câu hỏi về làn da
4. **Analysis Result** → Xem kết quả và gợi ý sản phẩm
5. **Dashboard** → Trang chủ với các tính năng chính

### Thêm Sản Phẩm Vào Quy Trình
1. Vào màn hình **Sản Phẩm**
2. Chọn sản phẩm → Nhấn **"Thêm vào quy trình"**
3. Chọn **Buổi Sáng** hoặc **Buổi Tối**
4. Sản phẩm sẽ xuất hiện trong màn hình **Quy Trình**

### Upload Ảnh Nhật Ký
1. Vào màn hình **Nhật ký**
2. Nhấn nút **"+ Thêm ảnh"**
3. Chọn ảnh từ thư viện (tối đa 7 ảnh)
4. Xóa ảnh bằng cách nhấn giữ và chọn **Xóa**

## 🔧 Scripts Có Sẵn

```bash
npm start          # Chạy Expo development server
npm run android    # Chạy trên Android emulator
npm run ios        # Chạy trên iOS simulator
npm run web        # Chạy trên web browser
```

## 📦 Dependencies Chính

```json
{
  "expo": "~54.0.0",
  "react": "18.3.1",
  "react-native": "0.76.5",
  "typescript": "^5.3.3",
  "expo-image-picker": "~15.0.7",
  "expo-linear-gradient": "~14.0.1",
  "@expo/vector-icons": "^14.0.4",
  "react-native-safe-area-context": "4.12.0"
}
```

## 🌟 Tính Năng Nổi Bật

### Context API - Quản Lý State
- **RoutineContext**: Quản lý quy trình sáng/tối
- Thêm/xóa sản phẩm từ danh mục
- Đánh dấu hoàn thành các bước trong quy trình

### Product Management
- 10 sản phẩm với hình ảnh thật
- Bộ lọc theo danh mục: Tất cả, Sữa rửa mặt, Serum, Kem dưỡng
- Thêm trực tiếp vào quy trình với thời gian tự động

### Journal với Image Picker
- Upload ảnh từ thư viện
- Giới hạn 7 ảnh để theo dõi tuần
- Crop ảnh theo tỷ lệ 1:1
- Xóa ảnh với xác nhận

## 🐛 Troubleshooting

### Lỗi khi cài đặt dependencies
```bash
# Xóa node_modules và lock file
rm -rf node_modules package-lock.json
npm install
```

### Metro bundler lỗi
```bash
# Clear cache
npx expo start -c
```

### Lỗi TypeScript
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## 📝 Lưu Ý

- Tất cả data là **mockdata**, không có backend thật
- Ứng dụng chưa có data persistence (sẽ reset khi reload)
- Product images được lưu local trong `assets/products/`
- Cần internet để load một số placeholder images từ Unsplash

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phát triển cho mục đích học tập và demo.

## 👥 Tác Giả

- GitHub: [@CongDucc](https://github.com/CongDucc)

## 📞 Liên Hệ

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub repository.

---

Made with ❤️ using React Native & Expo
