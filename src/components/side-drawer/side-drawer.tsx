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
  @Prop({reflect: true, mutable: true}) title: string = 'Lorem Prop Defaltum Titulum';

 /**
  * Defines whether the side drawer is opened or closed.
  */
  @Prop({reflect: true, mutable: true}) opened: boolean = false;

  onCloseDrawer() {
    this.opened = false;
  }
  onContactChange(content:string){
    console.warn(content)

  }

  render() {
    let mainContent = <slot />
    mainContent=(
      <div id ='contact-information'>
        <h2>Contact Us</h2>
        <p>Lorem ipsum dolor sit amet </p>
      </div>
    )

 
    return(

          <aside>
        <header>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
          <h1>{this.title}</h1>
        </header>
        <section id='tabs'>
          <button class="active" onClick={this.onContactChange.bind(this, 'nav')}>Navigation</button>
          <button onClick={this.onContactChange.bind(this, 'contact')}>Contact</button>
        </section>
        <main>
         {mainContent}
        </main>
      </aside>
    )
  }
}
