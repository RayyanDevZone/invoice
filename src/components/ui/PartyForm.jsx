import React, { useEffect, useMemo, useState } from "react";
import { TextField } from "./Field";
import Select from "./Select";
import { loadCountries } from "../../utils/locations";

// Only the "Bill From" business has a business name; the contact person's
// name is then labelled as such.
const businessNameField = { name: "businessName", label: "Business Name" };

const fieldConfig = [
  { name: "name", label: "Name" },
  { name: "address", label: "Address" },
  { name: "country", label: "Country", kind: "country" },
  { name: "state", label: "State / Province", kind: "state" },
  { name: "city", label: "City" },
  { name: "zip", label: "ZIP / Postal code" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel", inputMode: "tel" },
  { name: "gstReg", label: "GST Reg." },
];

// Shared country list; null while loading, [] if the API could not be reached.
export const useCountries = () => {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadCountries()
      .then((list) => !cancelled && setCountries(list))
      .catch((error) => {
        console.error("Failed to load countries", error);
        if (!cancelled) setCountries([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return countries;
};

// The states for the selected country, or null when there's no list to pick from
// (countries still loading, API unavailable, or a country without states).
export const statesFor = (countries, country) => {
  const states = countries?.find((c) => c.name === country)?.states;
  return states && states.length > 0 ? states : null;
};

const toOptions = (names) => names.map((name) => ({ value: name, label: name }));

const PartyForm = ({
  title,
  icon: Icon,
  section,
  data,
  onChange,
  placeholderPrefix,
  errors = {},
  onBlur,
  countries,
  readOnly = false,
  action,
  withBusinessName = false,
}) => {
  const fields = withBusinessName
    ? [businessNameField, ...fieldConfig.map((f) => (f.name === "name" ? { ...f, label: "Contact Name" } : f))]
    : fieldConfig;

  const loadedCountries = useCountries();
  const countryList = countries !== undefined ? countries : loadedCountries;
  const states = statesFor(countryList, data.country);

  const countryOptions = useMemo(() => {
    const options = toOptions((countryList || []).map((c) => c.name));
    // Keep a previously saved value selectable even if the API spells it differently.
    if (data.country && !options.some((o) => o.value === data.country)) {
      options.unshift({ value: data.country, label: data.country });
    }
    return options;
  }, [countryList, data.country]);

  const stateOptions = useMemo(() => {
    const options = toOptions(states || []);
    if (data.state && !options.some((o) => o.value === data.state)) {
      options.unshift({ value: data.state, label: data.state });
    }
    return options;
  }, [states, data.state]);

  const placeholder = (label) => `${placeholderPrefix} ${label.toLowerCase()}`;
  const touch = (name) => onBlur && onBlur(name);

  const renderField = ({ name, label, type, inputMode, kind }) => {
    const textField = (
      <TextField
        key={name}
        data-field={name}
        label={label}
        type={type || "text"}
        inputMode={inputMode}
        name={name}
        placeholder={placeholder(label)}
        value={data[name] || ""}
        onChange={(e) => onChange(section, name, e.target.value)}
        onBlur={() => touch(name)}
        error={errors[name]}
      />
    );

    // Fall back to typing when the country list couldn't be loaded.
    if (kind === "country" && !(countryList && countryList.length === 0)) {
      return (
        <Select
          key={name}
          name={name}
          label={label}
          value={data.country || ""}
          options={countryOptions}
          disabled={countryList === null}
          placeholder={countryList === null ? "Loading countries…" : "Select country"}
          onChange={(value) => {
            onChange(section, "country", value);
            if (value !== data.country) onChange(section, "state", "");
          }}
          onClose={() => touch(name)}
          error={errors[name]}
        />
      );
    }

    if (kind === "state" && states) {
      return (
        <Select
          key={name}
          name={name}
          label={label}
          value={data.state || ""}
          options={stateOptions}
          placeholder="Select state"
          onChange={(value) => onChange(section, "state", value)}
          onClose={() => touch(name)}
          error={errors[name]}
        />
      );
    }

    return textField;
  };

  // Enter moves to the next field when it's empty, otherwise just leaves this one.
  const handleKeyDown = (e) => {
    const field = e.target.dataset?.field;
    if (e.key !== "Enter" || e.target.tagName !== "INPUT" || !field) return;
    e.preventDefault();

    const controls = Array.from(e.currentTarget.querySelectorAll("[data-field]"));
    const next = controls[controls.indexOf(e.target) + 1];
    if (next && !next.disabled && !data[next.dataset.field]) {
      next.focus();
    } else {
      e.target.blur();
    }
  };

  const renderValue = ({ name, label }) => (
    <div key={name} className="flex flex-col gap-1 min-w-0">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className={`text-sm font-semibold break-words ${data[name] ? "text-gray-900" : "text-gray-300"}`}>
        {data[name] || "—"}
      </p>
    </div>
  );

  return (
    <div className="w-full h-full box-border py-5 px-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-8 w-8 rounded-full bg-brand/30 flex items-center justify-center shrink-0">
            <Icon className="text-brand-dark text-base" />
          </span>
          <h3 className="text-gray-900 font-bold text-lg truncate">{title}</h3>
        </div>
        {action}
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${readOnly ? "gap-x-4 gap-y-5" : "gap-x-4 gap-y-4"}`}
        onKeyDown={readOnly ? undefined : handleKeyDown}
      >
        {fields.map(readOnly ? renderValue : renderField)}
      </div>
    </div>
  );
};

export default PartyForm;
