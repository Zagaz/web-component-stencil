import { Component, h, State, Element, Host } from '@stencil/core';

const NASA_API_KEY = 'oDUOOjOZ3vqv3FzHzs7hhPYcZh5MBv8814BJcSyu';

@Component({
  tag: 'nasa-apod',
  styleUrl: './nasa-apod.less',
  shadow: true,
})

export class NasaApod {
  @Element() el: HTMLElement;
  @State() title: string = '';
  @State() date: string = '';
  @State() error: string = '';
  @State() loading: boolean = false;
  @State() image: string = '';
  @State() mediaType: string = '';

  onFetchApod(event: Event) {
    event.preventDefault();
    this.error = '';
    this.loading = true;
    this.image = '';
    this.title = '';
    this.mediaType = '';

    const inputElement = this.el.shadowRoot.querySelector('#nasa-query') as HTMLInputElement;
    const dateInput = inputElement ? inputElement.value : '';
    let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    
    if (dateInput) {
      url += `&date=${dateInput}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`NASA API request failed with status ${response.status}, try again later`);
        }
        return response.json();
      })
      .then(data => {
        this.title = data.title || '';
        this.date = data.date || '';
        this.image = data.url || '';
        this.mediaType = data.media_type || '';
      })
      .catch(error => {
        this.error = error.message || 'Unable to load NASA APOD data';
      })
      .finally(() => {
        this.loading = false;
      });
  }

  render() {
    return (
      <Host>
        <form onSubmit={event => this.onFetchApod(event)}>
          <input type="date" id="nasa-query" />
          <button type="submit" disabled={this.loading}>
            {this.loading ? 'Loading…' : 'Fetch'}
          </button>
        </form>

        {this.error ? <p class="error">Error: {this.error}</p> : null}

        {this.image && !this.loading ? (
          <div class="content-card">
            <h3>{this.title}</h3>
            <p><strong>Date:</strong> {this.date}</p>
            
            {this.mediaType === 'image' ? (
              <img src={this.image} alt={this.title || 'NASA APOD'} class="media-element" />
            ) : this.mediaType === 'video' ? (
              <iframe src={this.image} frameborder="0" class="media-element video-element"></iframe>
            ) : (
              <div class="image-container">
                <p>No image available</p>
              </div>
            )}
          </div>
        ) : null}
      </Host>
    );
  }
}