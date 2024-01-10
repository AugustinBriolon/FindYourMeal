import React from 'react';

class BuyMeCoffee extends React.Component {
  script: HTMLScriptElement;
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.script = document.createElement('script');
    this.script.setAttribute('data-name', 'BMC-Widget');
    this.script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
    this.script.setAttribute('data-id', 'augustinbriolon');
    this.script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    this.script.setAttribute('data-message', 'This website is free to use. Do you want to help support it?');
    this.script.setAttribute('data-color', '#FF813F');
    this.script.setAttribute('data-position', 'Right');
    this.script.setAttribute('data-x_margin', '18');
    this.script.setAttribute('data-y_margin', '18');
    this.script.async = true;
    this.script.onload = () => {
      const evt = document.createEvent('Event');
      evt.initEvent('DOMContentLoaded', false, false);
      window.dispatchEvent(evt);
    };
  }

  componentDidMount() {
    document.head.appendChild(this.script);
  }

  componentWillUnmount() {
    document.head.removeChild(this.script);
    const widgetBtn = document.getElementById('BMC-WBtn');
    if (widgetBtn) {
      document.body.removeChild(widgetBtn);
    }
  }

  render() {
    return null;
  }
}

export default BuyMeCoffee;
