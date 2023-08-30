import React from 'react';
import { render, screen } from '@testing-library/react';
import { sum } from './example';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});