"use client"

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {

  /* c'est le rendu coté serveur sa marche async et await
    - on n'utilise pas de useEffect pour la recuperation de donnée
    - {searchParams} : c'est recuperer les parameters dans URL
    async function Home({ searchParams }: any) { 
    // const allCars = await fetchCars({
    //   manufacturer: searchParams.manufacturer || '',
    //   year: searchParams.year || 2022,
    //   fuel: searchParams.fuel || '',
    //   limit: searchParams.limit || 10,
    //   model: searchParams.model || ''
    // })
    }
  */
    const [allCars, setAllCars] = useState([])
    const [loading, setLoading] = useState(false)

    // search states
    const [manufacturer, setManufacturer] = useState("")
    const [model, setModel] = useState("")

    // filter states
    const [fuel, setFuel] = useState("")
    const [year, setYear] = useState(2022)

    // pagination states
    const [limit, setLimit] = useState(10)

    const getCars = async() => {
      setLoading(true)
      try {
          const result = await fetchCars({
              manufacturer: manufacturer || '',
              year: year || 2022,
              fuel: fuel || '',
              limit: limit || 10,
              model: model || ''
          })
    
          setAllCars(result)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      getCars()
    }, [manufacturer, model, fuel, year, limit])



  // const isDataEmpty = !Array.isArray(allCars) || allCars.length <  1 || !allCars

  return (
    <main className="overflow-hidden">
      <Hero />

      <div 
        className="mt-12 padding-x padding-y max-width"
        id="discover"
      >
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />

          <div className="home__filter-container">
            <CustomFilter title="Fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title='Year' options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              { allCars?.map((car, index) => (
                <CarCard
                  key={index}
                  car={car}
                />
              )) }

              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image
                    src="/loader.svg"
                    alt="loader.."
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )}

            </div>

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ): (
          <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              <p>Erreur de recuperation des données vers le serveur</p>
          </div>
        )}
      </div>
    </main>
  );
}
