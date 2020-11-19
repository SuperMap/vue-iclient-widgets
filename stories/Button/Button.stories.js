import { withKnobs } from '@storybook/addon-knobs';

export default { title: 'Basic/button', decorators: [withKnobs] };

export const ButtonType = () => ({
  template: `  <div>
    <sm-button type="primary">
      Primary
    </sm-button>
    <sm-button>Default</sm-button>
    <sm-button type="dashed">
      Dashed
    </sm-button>
    <sm-button type="danger">
      Danger
    </sm-button>
    <sm-button type="primary">
      按钮
    </sm-button>
    <sm-button type="link">
      Link
    </sm-button>
  </div>`
});
ButtonType.story = {
  name: '按钮类型'
};

export const ButtonGroup = () => ({
  template: `<div>
    <h4 style="color:#fff;">Basic</h4>
    <sm-button-group>
      <sm-button>Cancel</sm-button>
      <sm-button type="primary">
        OK
      </sm-button>
    </sm-button-group>
    <sm-button-group>
      <sm-button disabled>
        L
      </sm-button>
      <sm-button disabled>
        M
      </sm-button>
      <sm-button disabled>
        R
      </sm-button>
    </sm-button-group>
    <sm-button-group>
      <sm-button type="primary">
        L
      </sm-button>
      <sm-button>M</sm-button>
      <sm-button>M</sm-button>
      <sm-button type="dashed">
        R
      </sm-button>
    </sm-button-group>

    <h4 style="color:#fff;margin-top:10px">With Icon</h4>
    <sm-button-group>
      <sm-button type="primary"> <sm-icon type="left" />Go back </sm-button>
      <sm-button type="primary"> Go forward<sm-icon type="right" /> </sm-button>
    </sm-button-group>
    <sm-button-group>
      <sm-button icon="cloud" />
      <sm-button icon="cloud-download" />
    </sm-button-group>
  </div>`
});
ButtonGroup.story = {
  name: '按钮组合'
};

export const DisabledState = () => ({
  template: `<div>
    <sm-button style="margin:8px 10px" type="primary">
      Primary
    </sm-button>
    <sm-button style="margin:8px 10px" type="primary" disabled>
      Primary(disabled)
    </sm-button>
    <br />
    <sm-button style="margin:8px 10px">Default</sm-button>
    <sm-button style="margin:8px 10px" disabled>
      Default(disabled)
    </sm-button>
    <br />
    <sm-button style="margin:8px 10px" type="dashed">
      Dashed
    </sm-button>
    <sm-button style="margin:8px 10px" type="dashed" disabled>
      Dashed(disabled)
    </sm-button>
    <br />
    <sm-button style="margin:8px 10px" type="link">
      Link
    </sm-button>
    <sm-button style="margin:8px 10px" type="link" disabled>
      Link(disabled)
    </sm-button>
    <div style="padding: 10px; background: rgb(190, 200, 200, 0.25)">
      <sm-button style="margin:8px 10px" ghost>
        Ghost
      </sm-button>
      <sm-button style="margin:8px 10px" ghost disabled>
        Ghost(disabled)
      </sm-button>
    </div>
  </div>`
});
DisabledState.story = {
  name: '不可用状态'
};

export const GhostButton = () => ({
  template: `
  <div style="padding: 10px; background: rgb(190, 200, 200, 0.25)">
    <sm-button type="primary" ghost>
      Primary
    </sm-button>
    <sm-button ghost>
      Default
    </sm-button>
    <sm-button type="dashed" ghost>
      Dashed
    </sm-button>
    <sm-button type="danger" ghost>
      Danger
    </sm-button>
    <sm-button type="link" ghost>
      Link
    </sm-button>
  </div>
  `
});
GhostButton.story = {
  name: '幽灵按钮'
};

export const ButtonSize = () => ({
  data() {
    return {
      size: 'large'
    };
  },
  methods: {
    handleSizeChange(e) {
      this.size = e.target.value;
    }
  },
  template: `
  <div style="color:#fff">
    <sm-radio-group :value="size" @change="handleSizeChange">
      <sm-radio-button value="large">
        Large
      </sm-radio-button>
      <sm-radio-button value="default">
        Default
      </sm-radio-button>
      <sm-radio-button value="small">
        Small
      </sm-radio-button>
    </sm-radio-group>
    <br><br>
    <sm-button type="primary" :size="size">
      Primary
    </sm-button>
    <sm-button :size="size">
      Normal
    </sm-button>
    <sm-button type="dashed" :size="size">
      Dashed
    </sm-button>
    <sm-button type="danger" :size="size">
      Danger
    </sm-button>
    <sm-button type="link" :size="size">
      Link
    </sm-button>
    <br>
    <div style="margin:15px 0">
    <sm-button type="primary" icon="download" :size="size" />
    <sm-button type="primary" shape="circle" icon="download" :size="size" />
    <sm-button type="primary" shape="round" icon="download" :size="size" />Download</sm-button>
    <sm-button type="primary" shape="round" icon="download" :size="size" />
    <sm-button type="primary" icon="download" :size="size">
      Download
    </sm-button>
    </div>
    <br>
    <sm-button-group :size="size">
      <sm-button type="primary">
        <sm-icon type="left" />Backward
      </sm-button>
      <sm-button type="primary">
        Forward<sm-icon type="right" />
      </sm-button>
    </sm-button-group>
  </div>
  `
});
ButtonSize.story = {
  name: '按钮尺寸'
};

export const BlockButton = () => ({
  template: `
  <div>
    <sm-button style="margin:8px 0" type="primary" block>
      Primary
    </sm-button>
    <sm-button style="margin:8px 0" block>
      Default
    </sm-button>
    <sm-button style="margin:8px 0" type="dashed" block>
      Dashed
    </sm-button>
    <sm-button style="margin:8px 0" type="danger" block>
      Danger
    </sm-button>
    <sm-button style="margin:8px 0" type="link" block>
      Link
    </sm-button>
  </div>
  `
});
BlockButton.story = {
  name: 'block按钮'
};
