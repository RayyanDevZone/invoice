// onKeyDown handler for a group of fields: Enter moves to the next field when
// it's empty, otherwise just leaves this one. Fields are the elements inside
// the group marked with data-field="<name>"; `data` holds their values.
export const enterToNext = (data) => (e) => {
  const field = e.target.dataset?.field;
  if (e.key !== 'Enter' || e.target.tagName !== 'INPUT' || !field) return;
  e.preventDefault();

  const controls = Array.from(e.currentTarget.querySelectorAll('[data-field]'));
  const next = controls[controls.indexOf(e.target) + 1];
  if (next && !next.disabled && !data[next.dataset.field]) {
    next.focus();
  } else {
    e.target.blur();
  }
};
