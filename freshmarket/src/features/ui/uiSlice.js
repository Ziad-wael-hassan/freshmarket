import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCartDrawerOpen: false,
  isMobileMenuOpen: false,
  activeModal: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCartDrawer: (state) => {
      state.isCartDrawerOpen = true
    },
    closeCartDrawer: (state) => {
      state.isCartDrawerOpen = false
    },
    toggleCartDrawer: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen
    },
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    openModal: (state, action) => {
      state.activeModal = action.payload
    },
    closeModal: (state) => {
      state.activeModal = null
    },
  },
})

export const {
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  openModal,
  closeModal,
} = uiSlice.actions

export default uiSlice.reducer
