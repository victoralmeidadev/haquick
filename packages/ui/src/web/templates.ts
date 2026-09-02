import { makeTemplates } from '../core/templates';
import { Screen } from './Screen';
import { XStack, YStack } from './Stack';
import { Card, CardContent, CardFooter, Skeleton, Typography, Divider } from './primitives';
import { EmptyState, PageHeader, StatCard } from './composed';
import { Input } from './controls';
import { Composer } from './chat';

export const { AuthTemplate, ListTemplate, DetailTemplate, DashboardTemplate, ChatTemplate } =
  makeTemplates({
    Screen,
    XStack,
    YStack,
    Card,
    CardContent,
    CardFooter,
    Typography,
    Divider,
    PageHeader,
    Skeleton,
    EmptyState,
    StatCard,
    Input,
    Composer,
  });
