import { Component, h, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'ltc-side-drawer',
  styleUrl: './side-drawer.less',
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo: boolean = false;

  /**
   * The theTitle of the side drawer.
   */
  @Prop({ reflect: true, mutable: true }) theTitle: string = 'Lorem Prop Defaltum Titulum';

  /**
   * Defines whether the side drawer is opened or closed.
   */
  @Prop({ reflect: true, mutable: true }) opened: boolean = false;

  toggleDrawer() {
    this.opened = !this.opened;
  }

  onContactChange(content: string) {
    console.warn(content);
    this.showContactInfo = content === 'nav';
  }

  @Method()
  async exampleMethod() {
    console.log('Example method called');
    return 'Hello from exampleMethod!';
  }
   



  render() {
    let mainContent = <slot />;
    if (!this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Us</h2>
          <p>Lorem ipsum dolor sit amet </p>
        </div>
      )
    }

    return (
      <aside>
          
        <header>
          <button
            onClick={() => this.toggleDrawer()}
            aria-label={this.opened ? 'Close drawer' : 'Open drawer'}
          >
            {this.opened ? '✕' : '☰'}
          </button>
          <h1>{this.theTitle}</h1>
        <section id="tabs">
          <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContactChange.bind(this, 'nav')}>
            Navigation
          </button>
          <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContactChange.bind(this, 'contact')}>Contact</button>
        </section>
        </header>
        <main>{mainContent}</main>
      </aside>
    );
  }
}
