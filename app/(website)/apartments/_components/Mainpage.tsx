

"use client";
import React from 'react';
import { Apartments_Banner } from './Apartments_Banner';
import { SearchResults } from './SearchResults';
import { Sunday } from './Sunday';
import { Monday } from './Monday';
import { Tuesday } from './Tuesday';
import { Wednesday } from './Wednesday';
import { Thursday } from './Thursday';
import { Friday } from './Friday';
import { Saturday } from './Saturday';

interface MainpageProps {
  query?: string;
}

const Mainpage = ({ query }: MainpageProps) => {
  return (
    <div>
      <Apartments_Banner />

      {query ? (
        <SearchResults query={query} />
      ) : (
        <>
          <Sunday />
          <Monday />
          <Tuesday />
          <Wednesday />
          <Thursday />
          <Friday />
          <Saturday />
        </>
      )}
    </div>
  );
};

export default Mainpage;
