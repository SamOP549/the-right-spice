import AddressModal from './AddressModal/index'
import PasswordModal from './PasswordModal/index'
import DeleteModal from './DeleteModal/index'
import ReviewModal from './ReviewModal/index.'

export default function Example(props) {
  if (props.showAddressModal == true) {
    return (
      <AddressModal {...props} />
    )
  }
  else if (props.showPasswordModal == true) {
    return (
      <PasswordModal {...props} />
    )
  }

  else if (props.showDeleteModal == true) {
    return (
      <DeleteModal {...props} />
    )
  }
  else if (props.showReviewModal == true) {
    return (
      <ReviewModal {...props} />
    )
  }
}
