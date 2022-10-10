export interface SelectedCity {
  name: string
  lon: number
  lat: number
}

export interface CityTabProps {
  selectedCity: SelectedCity
  setSelectedCity: (selectedCity: SelectedCity) => void
}
