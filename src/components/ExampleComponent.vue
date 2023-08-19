<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 500px;">
      <q-chat-message
        label="Sunday, 19th"
      />
      <q-chat-message
        v-for="message in chatMessages"
        :key="message.id"
        :name="message.name"
        :avatar="message.avatar"
        :text="message.text"
        :sent="message.sent"
        :stamp="message.stamp"
      />
      <q-input
        v-if="isAskingQuestion"
        v-model="currentAnswer"
        @keyup.enter="submitAnswer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExampleComponent',
  data() {
    return {
      currentStep: 0,
      currentQuestion: '',
      currentAnswer: '',
      // eslint-disable-next-line max-len
      chatMessages: [] as { id: number; name: string; avatar: string; text: string[]; sent: boolean; stamp: string }[],
      questions: [
        'Hi :-) My name is Jane, Your personal CV assistant. Let me know when you are ready to start...',
        'What is your full name?',
        'What is your phone number?',
        'What is your email address?',
        'What is your current address (including street, city, and state)?',
        'Do you have a professional LinkedIn profile? If so, please provide the URL.',
        // Add more questions here
      ],
      followUpQuestions: [],
      isAskingQuestion: true,
    };
  },
  mounted() {
    this.askQuestion();
  },
  methods: {
    askQuestion() {
      this.currentQuestion = this.questions[this.currentStep];
      this.isAskingQuestion = true;
      this.saveQuestion(this.currentQuestion);
    },
    submitAnswer() {
      if (this.currentAnswer) {
        this.saveAnswer(this.currentAnswer);
        this.currentAnswer = '';
        this.currentStep += 1;
        if (this.currentStep < this.questions.length) {
          this.isAskingQuestion = false;
          setTimeout(() => {
            this.askQuestion();
          }, 1000); // Wait for 1 second before asking the next question
        }
      }
    },
    saveQuestion(question: string) {
      this.chatMessages.push(
        {
          id: this.chatMessages.length,
          name: 'Jane',
          avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
          text: [question],
          sent: true,
          stamp: new Date().toLocaleString(),
        },
      );
    },
    saveAnswer(answer: string) {
      this.chatMessages.push(
        {
          id: this.chatMessages.length + 1,
          name: 'me',
          avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
          text: [answer],
          sent: false,
          stamp: new Date().toLocaleString(),
        },
      );
    },
  },
});
</script>
<style lang="scss" scoped>

</style>
