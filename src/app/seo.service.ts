import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogSiteName: string;
  canonical: string;
}

@Injectable()
export class SEOService {
  private readonly BASE_URL = 'https://kevincorizi.github.io';

  constructor(
    @Inject(DOCUMENT) private readonly dom: Document,
    private readonly title: Title,
    private readonly meta: Meta
  ) {}

  setTags(data: SEOData) {
    this.setTitle(data.title);
    this.setDescription(data.description);
    this.setKeywords(data.keywords);
    this.setOgTitle(data.ogTitle);
    this.setOgSiteName(data.ogSiteName);
    this.setOgUrl(data.canonical);
    this.setOgDescription(data.description);
    this.setCanonical(data.canonical);
  }

  private setTitle(title: string) {
    this.title.setTitle(title);
  }

  private setDescription(description: string) {
    this.meta.updateTag({ property: 'description', content: description });
  }

  private setKeywords(keywords: string) {
    this.meta.updateTag({ property: 'keywords', content: keywords });
  }

  private setOgTitle(ogTitle: string) {
    this.meta.updateTag({ property: 'og:title', content: ogTitle });
  }

  private setOgSiteName(ogSiteName: string) {
    this.meta.updateTag({ property: 'og:site_name', content: ogSiteName });
  }

  private setOgUrl(ogPath: string) {
    this.meta.updateTag({
      property: 'og:url',
      content: `og:${this.BASE_URL}${ogPath}`,
    });
  }

  private setOgDescription(ogDescription: string) {
    this.meta.updateTag({ property: 'og:description', content: ogDescription });
  }

  private setCanonical(canonicalPath: string) {
    this.dom.querySelector(`link[rel='canonical']`)?.setAttribute('href', `${this.BASE_URL}${canonicalPath}`);
  }
}
