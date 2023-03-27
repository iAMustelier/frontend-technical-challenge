import React, { useEffect, useMemo, useState } from 'react';
import { isNullish } from 'utils';
import { TabItem } from './TabItem';
import { useMatch, useNavigate } from 'react-router-dom';

type Tab = {
    label: string;
    content?: () => JSX.Element;
    redirectTo?: string;
};

type TabListProps = {
    tabs: Tab[];
};

export const TabList = ({ tabs }: TabListProps) => {
    const navigate = useNavigate();

    const match = useMatch(`/accounts/:account/:tab/*`);

    const selectedTabIndex = useMemo(
        () => tabs.findIndex((tab) => tab.redirectTo === match?.params.tab),
        [match?.params.tab, tabs],
    );

    const [selectedTab, setSelectedTab] = useState<number>(0);

    useEffect(() => {
        setSelectedTab(selectedTabIndex);
    }, [selectedTabIndex]);

    const handleTabChange = (index: number) => {
        setSelectedTab(index % tabs.length);
        // Only navigate if there is no content
        if (isNullish(tabs[index]?.content)) {
            navigate(`${tabs[index % tabs.length].redirectTo}`, {
                replace: true,
                relative: 'route',
            });
        }
    };

    const renderTabs = () => {
        return tabs.map((tab, i) => {
            return (
                <TabItem
                    key={i}
                    id={i}
                    label={tab.label}
                    isSelected={selectedTab === i}
                    onChange={handleTabChange}
                />
            );
        });
    };

    return (
        <div className="w-full border-t-[1px] border-t-gray border-solid">
            {renderTabs()}

            {/* Only render the content if it exists */}
            {!isNullish(tabs[selectedTab]?.content) && (
                <div className="p-4">{tabs[selectedTab]?.content?.()}</div>
            )}
        </div>
    );
};
