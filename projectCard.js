class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
            display: block;
        }

        .card {
            background: var(--card-bg);
            border: none;
            border-radius: 12px;
            padding: 1.2rem;
            

            /*  Make ALL cards same size */
            height: 420px; 
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 1rem;
            
            text-align: left;
            box-shadow: none;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        h2 {
            margin: 0;
            font-size: 1.3rem;
            color: var(--accent-color);
        }

        picture img {
            width: 100%;
            height: auto;

            /*  Ensures images take consistent space */
            aspect-ratio: 16/9;
            object-fit: cover;
            border-radius: 10px;
        }

        .desc {
            flex-grow: 1;
            color: var(--card-text);
            line-height: 1.4;
        }

        a {
            align-self: flex-start;
            margin-top: auto;       /* pushes button to bottom of card */
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            border: 1px solid var(--highlight);
            color: var(--highlight);
            transition: all 0.25s ease;
        }

        a:hover {
            background: var(--highlight);
            color: white;
        }
      </style>

      <article class="card">
        <h2></h2>
        <picture></picture>
        <p class="desc"></p>
        <a class="link" href="#" target="_blank">Learn More</a>
      </article>
    `;
  }

  set data(project) {
    this.shadowRoot.querySelector("h2").textContent = project.title;
    this.shadowRoot.querySelector(".desc").textContent = project.description;

    const pic = this.shadowRoot.querySelector("picture");
    pic.innerHTML = `
      <source srcset="${project.imgSm}" media="(max-width: 600px)">
      <img src="${project.img}" alt="${project.alt}">
    `;

    const a = this.shadowRoot.querySelector(".link");
    a.href = project.link;
  }
}

customElements.define("project-card", ProjectCard);
