<template>
  <div class="cv q-pa-md">
    <q-card class="row" bordered>
      <template v-for="(value, property) in cv" :key="property">
        <q-card-section :class="[
          getPropertyMetaData([property]).displayClass,
          property === context ? 'context-property' : null
        ]" @click="setContext(property)" outlined>
          <div class="row items-center">
            <simple-key-value :label-text="getPropertyMetaData([property]).label" />
            <q-fab v-if="property === context" flat outline color="primary" icon="keyboard_arrow_right" direction="right">
              <q-fab-action color="primary" @click="handleChatEdit" icon="chat">
                <q-tooltip>Chat Edit</q-tooltip>
              </q-fab-action>
              <q-fab-action color="secondary" @click="handleManualEdit" icon="edit">
                <q-tooltip>Manual Edit</q-tooltip>
              </q-fab-action>
              <q-fab-action color="red" @click="handleClear" icon="delete">
                <q-tooltip>Clear</q-tooltip>
              </q-fab-action>
            </q-fab>
            <div class="spacer"></div>
            <div v-if="context === property && showChatEdit" class="chat-widget q-pa-md row">
              <template v-for="message in chatMessages" :key="message.id">
                <q-chat-message :name="message.name" :avatar="message.avatar" :sent="message.sent" :stamp="message.stamp">
                  <p>{{ message.message.title }}</p>
                  <p>{{ message.message.body }}</p>
                  <div v-if="isThinking">
                    <q-spinner-dots size="2rem" />
                  </div>
                </q-chat-message>
              </template>
            </div>
          </div>
          <q-separator spaced />
          <template v-if="Array.isArray(value)">
            <div class="row q-gutter-md">
              <q-card flat bordered v-for="(subProperty, index) in value" :key="index"
                :class="getPropertyMetaData([property]).childDisplayClass">
                <q-card-section v-for="(value, key) in subProperty" :key="key"
                  :class="getPropertyMetaData([property, key]).displayClass">
                  <simple-key-value :value="value" :label-text="getPropertyMetaData([property, key]).label" />
                </q-card-section>
              </q-card>
            </div>
          </template>
          <template v-else-if="typeof value === 'string'">
            <q-card-section>
              <simple-key-value :value="value" />
            </q-card-section>
          </template>
          <template v-else>
            <div :class="getPropertyMetaData([property]).childDisplayClass">
              <q-card-section v-for="(subPropertyValue, subProperty) in value" :key="subProperty"
                :class="getPropertyMetaData([property, subProperty]).displayClass">
                <simple-key-value :value="subPropertyValue"
                  :label-text="getPropertyMetaData([property, subProperty]).label" />
              </q-card-section>
            </div>
          </template>
        </q-card-section>
      </template>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  PersonalInformation,
  Education,
  Experience,
  CV,
  cv,
  defaultCv,
  propertyMetadata,
  QueryTypes,
  MessageStates,
  Roles,
  MessageTypes,
  ChatMessage,
  generateUUID
} from './models';
import SimpleKeyValue from './SimpleKeyValue.vue';

export default defineComponent({
  name: 'CV',
  components: { SimpleKeyValue },
  data: () => ({
    cv,
    defaultCv,
    propertyMetadata,
    context: '',
    MessageStates,
    chatMessages: [] as Record<string, any>[],
    showChatEdit: false,
    isThinking: false,
    propertyMessages: {} as Record<string, any>,
  }),
  methods: {
    getPropertyMetaData(path: string[]) {
      const [property, subProperty] = path;
      if (property && subProperty) {
        return this.propertyMetadata?.[property]?.subProperties?.[subProperty] || {};
      }
      if (property && !subProperty) {
        return this.propertyMetadata[property] || {};
      }
      return {};
    },
    setContext(property: string) {
      this.context = property;
      if (!this.propertyMessages[property]) {
        this.propertyMessages[property] = [
          this.generateMessage(
            Roles.ASSISTANT,
            {
              index: 0,
              messages: [
                {
                  type: MessageTypes.INSTRUCTION,
                  title: "Hi, I'm Jane, your CV assistant",
                  body: 'how can i help?',
                  options: []
                }
              ]
            }
          )];
        this.chatMessages = this.propertyMessages[property];
      }
      this.chatMessages = this.propertyMessages[property];
    },
    handleChatEdit() {
      this.showChatEdit = true;
    },
    handleManualEdit() {
      console.log('nothing here...');
    },
    handleClear() {
      const contextKey = this.context as keyof CV;
      const newVal = {
        [contextKey]: this.defaultCv[contextKey],
      };
      Object.assign(this.cv, newVal);
    },
    formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    },
    editField(section: string, index?: number, field?: keyof (PersonalInformation | Education | Experience) | 'summary') {
      if (field) {
        const value = (this as any)[section][index!][field];
        const newValue = prompt(`Update ${field}`, value);
        if (newValue !== null) {
          (this as any)[section][index!][field] = newValue;
        }
      } else {
        const value = (this as any)[section];
        const newValue = prompt(`Update ${section}`, value);
        if (newValue !== null) {
          (this as any)[section] = newValue;
        }
      }
    },
    addItem(section: string) {
      const newItem = prompt(`Add ${section}`, '');
      if (newItem !== null) {
        (this as any)[section].push(newItem);
      }
    },
    async queryGPT(queryType: string, property: string, data: any): Promise<ChatMessage> {
      return {
        index: 0,
        messages: [
          {
            type: MessageTypes.INSTRUCTION,
            title: 'Improvement found',
            body: 'Details about the improvements'
          },
          {
            type: MessageTypes.QUESTION,
            title: 'Add personal details',
            body: 'Please enter your personal details...'
          },
          {
            type: MessageTypes.SUGGESTION,
            title: 'Enhance the summary',
            body: {
              property: 'summary',
              value: 'New Summary'
            }
          }
        ]
      };
    },
    async think() {
      this.isThinking = true;
    },
    async suggestImprovements(property: string) {
      console.log(property);
    },
    async addInformation(property: string) {
      const questions = await this.queryGPT(QueryTypes.ASK, property, this.cv);
    },
    generateMessage(role: Roles, chatMessage: ChatMessage) {
      const message = chatMessage.messages[chatMessage.index];
      return {
        id: generateUUID(),
        name: role === Roles.ASSISTANT ? 'Jane' : 'Me',
        avatar: role === Roles.ASSISTANT ? 'https://cdn.quasar.dev/img/avatar3.jpg' : 'https://cdn.quasar.dev/img/avatar3.jpg',
        message,
        sent: role === Roles.ASSISTANT,
        stamp: new Date().toLocaleString(),
      }
    }
  },
  async mounted() {
    // (this.chatMessages as any).push(assistantMessages.default.assistant);
  },
});
</script>
<style lang="scss" scoped>
.context-property {
  background-color: lightblue;
}

.chat-widget {
  height: 200px;
  display: flex;
  flex-flow: column;
  width: 500px;
}

.spacer {
  flex: 1;
}

u {
  cursor: pointer;
}
</style>
