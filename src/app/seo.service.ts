import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SEOService {
  private readonly BASE_URL = 'https://kevincorizi.com';

  constructor(
    @Inject(DOCUMENT) private readonly dom: Document,
    private readonly title: Title,
    private readonly meta: Meta
  ) {}

  setTitle(title: string) {
    this.title.setTitle(title);
  }

  setDescription(description: string) {
    this.meta.updateTag({ property: 'description', content: description });
  }

  setKeywords(keywords: string) {
    this.meta.updateTag({ property: 'keywords', content: keywords });
  }

  setOgTitle(ogTitle: string) {
    this.meta.updateTag({ property: 'og:title', content: ogTitle });
  }

  setOgSiteName(ogSiteName: string) {
    this.meta.updateTag({ property: 'og:site_name', content: ogSiteName });
  }

  setOgUrl(ogPath: string) {
    this.meta.updateTag({
      property: 'og:url',
      content: `og:${this.BASE_URL}${ogPath}`,
    });
  }

  setOgDescription(ogDescription: string) {
    this.meta.updateTag({ property: 'og:description', content: ogDescription });
  }

  setCanonical(canonicalPath: string) {
    this.dom
      .querySelector(`link[rel='canonical']`)
      ?.setAttribute('href', `${this.BASE_URL}${canonicalPath}`);
  }
}
