import React from 'react';
import { Hero } from './Hero';
import { AboutUs } from './AboutUs';
import { Mission } from './Mission';
import { Values } from './Values';
import { Services } from './Services';
import { WhyChooseUs } from './WhyChooseUs';
import { PropertiesList } from './PropertiesList';
import { PropertyGallery } from './PropertyGallery';
import { Contact } from './Contact';
import { Testimonials } from './Testimonials';

export function Home() {
  return (
    <div className="pt-16">
      <div id="inicio">
        <Hero />
      </div>
      <div id="quienes-somos">
        <AboutUs />
      </div>
      <div id="mision">
        <Mission />
      </div>
      <div id="valores">
        <Values />
      </div>
      <div id="servicios">
        <Services />
      </div>
      <div id="why-choose-us">
        <WhyChooseUs />
      </div>
      <div id="propiedades">
        <PropertiesList />
      </div>
      <div id="galeria">
        <PropertyGallery />
      </div>
      <div id="testimonios">
        <Testimonials />
      </div>
      <div id="contacto">
        <Contact />
      </div>
    </div>
  );
}