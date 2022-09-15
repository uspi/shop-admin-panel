import { useState } from 'react';
import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiHeader,
  EuiHeaderLogo,
  EuiPortal,
  EuiText,
  EuiTitle,
  useGeneratedHtmlId,
} from '@elastic/eui';
import { Link } from 'react-router-dom';

export const MainApp: React.FC<PropsType> = () => {
  // const { euiTheme } = useEuiTheme();

  const guideHeaderAlertFlyoutId = useGeneratedHtmlId({
    prefix: 'guideHeaderAlertFlyout',
  });
  const guideHeaderAlertFlyoutTitleId = useGeneratedHtmlId({
    prefix: 'guideHeaderAlertFlyoutTitle',
  });

  /**
   * Header Alerts
   */
  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);
  const headerAlerts = (
    <EuiPortal>
      <EuiFlyout
        onClose={() => setIsAlertFlyoutVisible(false)}
        size="s"
        id={guideHeaderAlertFlyoutId}
        aria-labelledby={guideHeaderAlertFlyoutTitleId}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id={guideHeaderAlertFlyoutTitleId}>EuiHeaderAlert</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText size="s" color="subdued">
            <p>
              Please see the component page for{' '}
              <Link to="/layout/header">
                <strong>EuiHeaderAlert</strong>
              </Link>{' '}
              on how to configure your alerts.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    </EuiPortal>
  );

 
  /**
   * Sitewide search
   */
  // const search = (
  //   <EuiSelectableTemplateSitewide
  //     options={[]}
  //     searchProps={{
  //       append: '⌘K',
  //       compressed: true,
  //     }}
  //     popoverButton={
  //       <EuiHeaderSectionItemButton aria-label="Sitewide search">
  //         <EuiIcon type="search" size="m" />
  //       </EuiHeaderSectionItemButton>
  //     }
  //     popoverButtonBreakpoints={['xs', 's']}
  //     popoverProps={{
  //       repositionOnScroll: true, // Necessary when placing search in a fixed component
  //     }}
  //     emptyMessage={
  //       <EuiSelectableMessage style={{ minHeight: 300 }}>
  //         <p>
  //           Please see the component page for{' '}
  //           <Link to="/forms/selectable">
  //             <strong>EuiSelectableTemplateSitewide</strong>
  //           </Link>{' '}
  //           on how to configure your sitewide search.
  //         </p>
  //       </EuiSelectableMessage>
  //     }
  //   />
  // );

  return (
    <>
      <EuiHeader
        theme="dark"
        position="fixed"
        sections={[
          {
            items: [
              <EuiHeaderLogo iconType="logoElastic" href="">
                Shop Admin Panel
              </EuiHeaderLogo>,
            ],
            borders: 'none',
          }
        ]}
      />
      <EuiHeader position="fixed"/>

      {isAlertFlyoutVisible ? headerAlerts : null}
    </>
  );
};

type PropsType = {}