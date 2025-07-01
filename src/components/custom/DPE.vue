<template>
  <fieldset class="fr-fieldset" id="dpe" aria-labelledby="radio-legende-dpe">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="radio-legende-dpe">
      Quelle est l’étiquette DPE de votre logement ?
    </legend>
    <div class="fr-fieldset__element fr-mb-1w">
      <div class="fr-radio-group">
        <input
          @change.prevent="onInputChange"
          :checked="'A' === defaultValue"
          value="A"
          type="radio"
          id="dpe-A"
          name="dpe"
        />
        <label class="fr-label fr-label--dpe" for="dpe-A"><span class="dpe dpe--a">A</span></label>
      </div>
    </div>
    <div class="fr-fieldset__element fr-mb-1w">
      <div class="fr-radio-group">
        <input
          @change.prevent="onInputChange"
          :checked="'B' === defaultValue"
          value="B"
          type="radio"
          id="dpe-B"
          name="dpe"
        />
        <label class="fr-label fr-label--dpe" for="dpe-B"> <span class="dpe dpe--b">B</span></label>
      </div>
    </div>
    <div class="fr-fieldset__element fr-mb-1w">
      <div class="fr-radio-group">
        <input
          @change.prevent="onInputChange"
          :checked="'C' === defaultValue"
          value="C"
          type="radio"
          id="dpe-C"
          name="dpe"
        />
        <label class="fr-label fr-label--dpe" for="dpe-C"><span class="dpe dpe--c">C</span></label>
      </div>
    </div>
    <div class="fr-fieldset__element fr-mb-1w">
      <div class="fr-radio-group">
        <input
          @change.prevent="onInputChange"
          :checked="'D' === defaultValue"
          value="D"
          type="radio"
          id="dpe-D"
          name="dpe"
        />
        <label class="fr-label fr-label--dpe" for="dpe-D"> <span class="dpe dpe--d">D</span> </label>
      </div>
    </div>
    <div class="fr-fieldset__element fr-mb-1w">
      <div class="fr-radio-group">
        <input
          @change.prevent="onInputChange"
          :checked="'E' === defaultValue"
          value="E"
          type="radio"
          id="dpe-E"
          name="dpe"
        />
        <label class="fr-label fr-label--dpe" for="dpe-E"> <span class="dpe dpe--e active">E</span></label>
      </div>
    </div>
    <div class="fr-fieldset__element fr-mb-1w">
      <div class="fr-radio-group">
        <input
          @change.prevent="onInputChange"
          :checked="'F' === defaultValue"
          value="F"
          type="radio"
          id="dpe-F"
          name="dpe"
        />
        <label class="fr-label fr-label--dpe" for="dpe-F"> <span class="dpe dpe--f">F</span></label>
      </div>
    </div>
    <div class="fr-fieldset__element fr-mb-1w">
      <div class="fr-radio-group">
        <input
          @change.prevent="onInputChange"
          :checked="'G' === defaultValue"
          value="G"
          type="radio"
          id="dpe-G"
          name="dpe"
        />
        <label class="fr-label fr-label--dpe" for="dpe-G"> <span class="dpe dpe--g">G</span></label>
      </div>
    </div>
    <div class="fr-fieldset__element fr-mb-1w">
      <div class="fr-radio-group fr-py-1v">
        <input
          @change.prevent="onInputChange"
          :checked="'ne_sais_pas' === defaultValue"
          value="ne_sais_pas"
          type="radio"
          id="dpe-ne_sais_pas"
          name="dpe"
        />
        <label class="fr-label" for="dpe-ne_sais_pas"><span class="fr-ml-2w"> Je ne sais pas</span></label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  defineProps<{ defaultValue?: string | boolean }>();

  const emit = defineEmits(['update:modelValue']);

  const onInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    let valueToUpdate;

    if (input.value === 'true') {
      valueToUpdate = true;
    } else if (input.value === 'false') {
      valueToUpdate = false;
    } else {
      valueToUpdate = input.value;
    }

    emit('update:modelValue', valueToUpdate);
  };
</script>

<style>
  .fr-radio-group input[type='radio'] + label {
    background-position: 1rem;
  }

  .fr-radio-group input[type='radio'] + label:before {
    top: 0.8rem;
    left: calc(2.2rem - 1px);
  }
  .fr-radio-group {
    max-width: none;
    width: 100%;
  }

  .fr-radio-group input[type='radio'] + label {
    background-position: left center;
  }

  .dpe {
    position: relative;
    padding: 20px;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    height: 50px;
    margin-left: 1rem;
  }

  .dpe--a {
    width: 20%;
    background-color: #009c6d;
  }

  .dpe--a::after {
    border-color: transparent transparent transparent #009c6d;
  }

  .dpe--b {
    width: 30%;
    background-color: #52b153;
  }

  .dpe--b::after {
    border-color: transparent transparent transparent #52b153;
  }

  .dpe--c {
    width: 40%;
    background-color: #78bd0b;
  }

  .dpe--c::after {
    border-color: transparent transparent transparent #78bd0b;
  }

  .dpe--d {
    width: 50%;
    background-color: #f4e70f;
  }

  .dpe--d::after {
    border-color: transparent transparent transparent #f4e70f;
  }

  .dpe--e {
    width: 60%;
    background-color: #f0b50f;
  }

  .dpe--e::after {
    border-color: transparent transparent transparent #f0b50f;
  }

  .dpe--f {
    width: 70%;
    background-color: #eb8235;
  }

  .dpe--f::after {
    border-color: transparent transparent transparent #eb8235;
  }

  .dpe--g {
    width: 80%;
    background-color: #d7221f;
  }

  .dpe--g::after {
    border-color: transparent transparent transparent #d7221f;
  }

  .dpe::after {
    content: '';
    position: absolute;
    right: -24px;
    top: 50%;
    border-style: solid;
    border-width: 24px 0 24px 24px;
    box-sizing: border-box;
    transform: translateY(-50%);
  }

  .fr-radio-group input[type='radio']:checked + label .dpe {
    border: 2px solid blue;
  }

  .fr-radio-group input[type='radio']:checked + label .dpe::before {
    content: '';
    position: absolute;
    right: -27px;
    top: 50%;
    border-style: solid;
    border-width: 25px 0 25px 25px;
    border-color: transparent transparent transparent blue;
    transform: translateY(-50%);
  }
</style>
