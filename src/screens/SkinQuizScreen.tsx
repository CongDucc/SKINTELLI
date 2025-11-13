import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface QuizOption {
  id: string;
  label: string;
  value: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  image?: string;
  options: QuizOption[];
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Da của bạn có bị nhờn trong ngày không?',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
    options: [
      { id: '1a', label: 'Thỉnh thoảng', value: 'sometimes' },
      { id: '1b', label: 'Nhiều', value: 'often' },
      { id: '1c', label: 'Không', value: 'never' },
    ],
  },
  {
    id: 2,
    question: 'Da bạn có dễ bị kích ứng không?',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    options: [
      { id: '2a', label: 'Rất dễ', value: 'very_easy' },
      { id: '2b', label: 'Thỉnh thoảng', value: 'sometimes' },
      { id: '2c', label: 'Không', value: 'never' },
    ],
  },
  {
    id: 3,
    question: 'Kích thước lỗ chân lông của bạn?',
    image: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=400&fit=crop',
    options: [
      { id: '3a', label: 'To rõ ràng', value: 'large' },
      { id: '3b', label: 'Vừa phải', value: 'medium' },
      { id: '3c', label: 'Nhỏ/Không thấy', value: 'small' },
    ],
  },
  {
    id: 4,
    question: 'Da bạn có cảm giác khô căng không?',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
    options: [
      { id: '4a', label: 'Thường xuyên', value: 'often' },
      { id: '4b', label: 'Thỉnh thoảng', value: 'sometimes' },
      { id: '4c', label: 'Không bao giờ', value: 'never' },
    ],
  },
  {
    id: 5,
    question: 'Da bạn có bị mụn trứng cá không?',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=400&fit=crop',
    options: [
      { id: '5a', label: 'Thường xuyên', value: 'often' },
      { id: '5b', label: 'Thỉnh thoảng', value: 'sometimes' },
      { id: '5c', label: 'Hiếm khi', value: 'rarely' },
    ],
  },
];

interface SkinQuizScreenProps {
  onComplete?: (answers: Record<number, string>) => void;
  onSkip?: () => void;
}

export default function SkinQuizScreen({ onComplete, onSkip }: SkinQuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (questionId: number, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Tự động chuyển câu tiếp theo sau 300ms
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Hoàn thành quiz
        onComplete?.(newAnswers);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={currentQuestion === 0 ? onSkip : handleBack}>
          <Ionicons name="close" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kiểm tra da</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Câu hỏi {currentQuestion + 1}/5</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Question */}
        <Text style={styles.question}>{question.question}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                answers[question.id] === option.value && styles.optionButtonSelected,
              ]}
              onPress={() => handleAnswer(question.id, option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  answers[question.id] === option.value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Image */}
        {question.image && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: question.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Next Button */}
        {answers[question.id] && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (currentQuestion < quizData.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                onComplete?.(answers);
              }
            }}
          >
            <Text style={styles.nextButtonText}>Tiếp theo</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressText: {
    fontSize: 12,
    color: '#6B6B6B',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6B4EFF',
    borderRadius: 3,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: '#F8F9FE',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  optionButtonSelected: {
    backgroundColor: '#F3E5F5',
    borderColor: '#6B4EFF',
  },
  optionText: {
    fontSize: 15,
    color: '#1A1A1A',
    textAlign: 'center',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#6B4EFF',
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  nextButton: {
    backgroundColor: '#E8B4D9',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
