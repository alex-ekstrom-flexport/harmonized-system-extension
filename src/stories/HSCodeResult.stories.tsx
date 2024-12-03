import React from 'react';
import HSCodeResult from '../popup/components/HSCodeResult';
import "../popup/components/HSCodeResult.css";

export default {
  title: 'HSCodeResult',
  component: HSCodeResult,
}

export const basicCard = () => {
  return (
    <>
      <HSCodeResult heading={"0101"} suffix={".21.00"} description={"Purebred breeding animals.\n" +
        "\n"} hsRates={4.5}/>
    </>
  )
}