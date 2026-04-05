import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'ltc-side-drawer',
  styleUrl: './side-drawer.less',
  shadow: true,
})


export class SideDrawer {
  /**
   * The title of the side drawer. 
   */
  @Prop() title: string = 'Lorem Prop Defaltum Titulum';

  render() {
    return (
      <aside>
        <header>
          <h1>{this.title}</h1>
        </header>
        <main>
          <slot></slot>
          <p>This is the main content area.</p>
          </main>
      </aside>
    );
  }
}
