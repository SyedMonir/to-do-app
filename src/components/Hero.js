import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Assalamualikum</h1>
          <p className="py-6 capitalize">Its an to-do-app For yourself!</p>
          <Link to={'/to_do_app'} className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
