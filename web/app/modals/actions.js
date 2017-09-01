import {
    closeModal as _closeModal,
    openModal as _openModal
} from 'progressive-web-sdk/dist/store/modals/actions'
import {lockScroll, unlockScroll} from '../containers/app/actions'

export const openModal = (modalName, analyticsName) => (dispatch) => {
    dispatch(_openModal(modalName, analyticsName))
    dispatch(lockScroll())
}

export const closeModal = (modalName, analyticsName) => (dispatch) => {
    dispatch(_closeModal(modalName, analyticsName))
    dispatch(unlockScroll())
}