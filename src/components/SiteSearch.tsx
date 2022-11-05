import React, { useState, useEffect } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiLink,
  EuiBadge,
  EuiButton,
  EuiSelectableTemplateSitewide,
  EuiSelectableTemplateSitewideOption,
  useEuiTheme,
  EuiSearchBar,
  EuiFieldSearch,
} from '@elastic/eui';
import { css } from '@emotion/react';

export const SiteSearch = () => {
  const [isLoading, setLoading] = useState(false);

  const [isClearable, setIsClearable] = useState(true);
  const [searchValue, setSearchvalue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchvalue(e.target.value);
  };

  return (
    <>
      <EuiFieldSearch
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onChange(e)}
        isClearable={isClearable}
      />
    </>
  );
};