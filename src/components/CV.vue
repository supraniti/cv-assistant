<template>
  <div class="cv q-pa-md">
    <q-card class="row" bordered>
      <template
        v-for="(value, property) in cv"
        :key="property"
      >
        <q-card-section
          :class="[
            getPropertyMetaData([property]).displayClass,
            property === context ? 'context-property' : null
          ]"
          @click="setContext(property)"
          outlined
        >
          <div class="row items-center">
            <simple-key-value
              :label-text="getPropertyMetaData([property]).label"
            />
            <q-fab
              v-if="property === context"
              flat
              outline
              color="primary"
              icon="keyboard_arrow_right"
              direction="right"
            >
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
            <div
              v-if="context === property && showChatEdit"
              class="chat-widget q-pa-md row"
            >
              <template
                v-for="message in chatMessages"
                :key="message.id"
              >
                <q-chat-message
                  :name="message.name"
                  :avatar="message.avatar"
                  :sent="message.sent"
                  :stamp="message.stamp"
                >
                  <div v-for="(text, index) in message.text" :key="index">{{ text }}</div>
                  <div>
                    <a href="#" @click="suggestImprovements(context)">Suggest improvements</a>,
                    <a href="#" @click="addInformation(context)">Help me add more information</a>
                  </div>
                  <div v-if="isThinking">
                    <q-spinner-dots size="2rem"/>
                  </div>
                </q-chat-message>
              </template>
            </div>
          </div>
          <q-separator spaced/>
          <template v-if="Array.isArray(value)">
            <div class="row q-gutter-md">
              <q-card
                flat bordered
                v-for="subProperty in value"
                :key="subProperty"
                :class="getPropertyMetaData([property]).childDisplayClass"
              >
                <q-card-section
                  v-for="(value, key) in subProperty"
                  :key="key"
                  :class="getPropertyMetaData([property, key]).displayClass"
                >
                  <simple-key-value
                    :value="value"
                    :label-text="getPropertyMetaData([property, key]).label"
                  />
                </q-card-section>
              </q-card>
            </div>
          </template>
          <template v-else-if="typeof value === 'string'">
            <q-card-section>
              <simple-key-value
                :value="value"
              />
            </q-card-section>
          </template>
          <template v-else>
            <div
              :class="getPropertyMetaData([property]).childDisplayClass"
            >
              <q-card-section
                v-for="(subPropertyValue, subProperty) in value"
                :key="subProperty"
                :class="getPropertyMetaData([property, subProperty]).displayClass"
              >
                <simple-key-value
                  :value="subPropertyValue"
                  :label-text="getPropertyMetaData([property, subProperty]).label"
                />
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
  assistantMessages,
  QueryTypes,
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
    chatMessages: [],
    showChatEdit: false,
    isThinking: false,
    propertyMessages: {} as Record<string, any>,
  }),
  methods: {
    getPropertyMetaData(path: string[]) {
      const [property, subProperty] = path;
      if (property && subProperty) {
        return this.propertyMetadata?.[property]?.subProperties?.[subProperty];
      }
      if (property && !subProperty) {
        return this.propertyMetadata[property];
      }
      return null;
    },
    setContext(property: string) {
      this.context = property;
      if (!this.propertyMessages[property]) {
        this.propertyMessages[property] = [assistantMessages.default.assistant];
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
    async queryGPT(queryType: string, property:string, data: any) {
      console.log(queryType, property, data);
      return ['suggestionA', 'suggestionB'];
    },
    async think() {
      this.isThinking = true;
    },
    async suggestImprovements(property: string) {
      this.isThinking = true;
      const suggestions = await this.queryGPT(QueryTypes.SUGGEST, property, this.cv[property]);
      suggestions.forEach((suggestion) => {
        this.chatMessages[0].text.push(suggestion);
      });
      this.isThinking = false;
    },
    async addInformation(property: string) {
      const questions = await this.queryGPT(QueryTypes.ASK, property, this.cv[property]);

    },
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
  overflow: scroll;
  width: 500px;
}

.spacer {
  flex: 1;
}
</style>
