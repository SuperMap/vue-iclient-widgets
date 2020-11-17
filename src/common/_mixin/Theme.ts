import Vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';
import globalEvent from '../_utils/global-event';

@Component({
  name: 'Theme'
})
export default class Theme extends Vue {
  backgroundData: string = '';

  backgroundLightData: string = '';

  backgroundBaseData: string = '';

  textColorsData: string = '';

  textColorSecondaryData: string = '';

  selectedColorData: string = '';

  hoverColorData: string = '';

  clickColorData: string = '';

  successColorData: string = '';

  infoColorData: string = '';

  warningColorData: string = '';

  dangerColorData: string = '';

  disabledBgColorData: string = '';

  disabledBorderColorData: string = '';

  disabledTextColorData: string = '';

  colorGroupsData: Array<string> = [];

  @Prop() background: string;

  @Prop() backgroundLight: string;

  @Prop() backgroundBase: string;

  @Prop() textColor: string;

  @Prop() textColorSecondary: string;

  @Prop() selectedColor: string;

  @Prop() hoverColor: string;

  @Prop() clickColor: string;

  @Prop() successColor: string;

  @Prop() infoColor: string;

  @Prop() warningColor: string;

  @Prop() dangerColor: string;

  @Prop() disabledBgColor: string;

  @Prop() disabledBorderColor: string;

  @Prop() disabledTextColor: string;

  @Prop() borderBaseColor: string;

  @Prop() colorGroup: Array<string>;

  get getBackgroundStyle() {
    return {
      background: this.backgroundData
    };
  }

  get getTextColorStyle() {
    return {
      color: this.textColorsData
    };
  }

  get getBackground() {
    return this.backgroundData;
  }

  get getTextColor() {
    return this.textColorsData;
  }

  get getColorStyle() {
    return function(index) {
      return {
        color: this.colorGroupsData[index]
      };
    };
  }

  get getColor() {
    return function(index) {
      return this.colorGroupsData[index];
    };
  }

  @Emit()
  themeStyleChanged(value?) {
    return value;
  }

  created() {
    this.initThemeData();
    this.registerPropListener();
  }

  mounted() {
    globalEvent.$on('change-theme', themeStyle => {
      const $props = this.getSelfProps();
      $props.forEach((prop: string) => {
        const dataName: string = this.getDataNameOfProp(prop);
        this[dataName] = themeStyle[prop];
      });
      this.themeStyleChanged();
    });
  }

  initThemeData(): void {
    let theme = globalEvent.$options.theme;
    const $props = this.getSelfProps();
    $props.forEach((prop: string) => {
      const dataName: string = this.getDataNameOfProp(prop);
      this[dataName] = this[prop] || (theme && theme[prop]);
    });
  }

  registerPropListener(): void {
    const vm = this;
    const $props = this.getSelfProps();
    $props.forEach((prop: string) => {
      this.$watch(prop, function(next, prev) {
        const dataName: string = this.getDataNameOfProp(prop);
        vm[dataName] = next;
      });
    });
  }

  getSelfProps(): string[] {
    // @ts-ignore
    return Object.keys(Theme.extendOptions.props);
  }

  getDataNameOfProp(prop: string) {
    switch (prop) {
      case 'textColor':
        return 'textColorsData';
      case 'colorGroup':
        return 'colorGroupsData';
      default:
        return `${prop}Data`;
    }
  }
}