# frozen_string_literal: true

# Typed models for the UnixConverter SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Conversion entity data model.
#
# @!attribute [rw] input
#   @return [Hash, nil]
#
# @!attribute [rw] output
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Conversion = Struct.new(
  :input,
  :output,
  :success,
  keyword_init: true
)

# Match filter for Conversion#load (any subset of Conversion fields).
#
# @!attribute [rw] input
#   @return [Hash, nil]
#
# @!attribute [rw] output
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
ConversionLoadMatch = Struct.new(
  :input,
  :output,
  :success,
  keyword_init: true
)

